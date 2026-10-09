<?php
/**
 * VISITOR GEOLOCATION TRACKER ENGINE
 * Portofolio Farrij - Auto Log & Notification
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------------------------------------------
// KONFIGURASI NOTIFIKASI:
// -------------------------------------------------------------
$TARGET_EMAIL        = "contact.farrij@gmail.com"; // Email resmi dari portofolio Farrij
$DISCORD_WEBHOOK_URL = ""; // Opsional: Contoh "https://discord.com/api/webhooks/xxxx/yyyy"
$TELEGRAM_BOT_TOKEN  = ""; // Opsional: Contoh "123456789:ABCDefgh..."
$TELEGRAM_CHAT_ID    = ""; // Opsional: Contoh "12345678"

// Tangkap IP Asli dari Request
function getClientIP() {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ips = explode(',', $_SERVER[$key]);
            return trim($ips[0]);
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = [];
}

$ip = !empty($data['ip']) ? $data['ip'] : getClientIP();
$city = $data['city'] ?? 'Tidak Diketahui';
$region = $data['region'] ?? '';
$country = $data['country'] ?? '';
$isp = $data['isp'] ?? $data['org'] ?? 'Unknown ISP';
$lat = $data['latitude'] ?? $data['lat'] ?? null;
$lon = $data['longitude'] ?? $data['lon'] ?? null;
$mapsLink = ($lat && $lon) ? "https://www.google.com/maps?q={$lat},{$lon}" : "-";
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? ($data['userAgent'] ?? 'Unknown UA');
$referer = $_SERVER['HTTP_REFERER'] ?? ($data['referrer'] ?? 'Langsung / Direct');
$screen = $data['screen'] ?? '-';
$timestamp = date('Y-m-d H:i:s');

$record = [
    'timestamp'  => $timestamp,
    'ip'         => $ip,
    'city'       => $city,
    'region'     => $region,
    'country'    => $country,
    'location'   => trim("{$city}, {$region}, {$country}", ', '),
    'coords'     => ($lat && $lon) ? "{$lat}, {$lon}" : null,
    'maps_link'  => $mapsLink,
    'isp'        => $isp,
    'screen'     => $screen,
    'user_agent' => $userAgent,
    'referer'    => $referer
];

// Simpan ke file log JSON
$logFile = __DIR__ . '/visitors_log.json';
$existingLogs = [];
if (file_exists($logFile)) {
    $content = file_get_contents($logFile);
    $existingLogs = json_decode($content, true) ?: [];
}

// Taruh log terbaru di paling atas (maksimal 500 riwayat)
array_unshift($existingLogs, $record);
if (count($existingLogs) > 500) {
    $existingLogs = array_slice($existingLogs, 0, 500);
}
@file_put_contents($logFile, json_encode($existingLogs, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

// Kirim ke Discord Webhook jika diisi
if (!empty($DISCORD_WEBHOOK_URL)) {
    $embed = [
        "title" => "🚨 PENGUNJUNG TERLACAK DI PORTOFOLIO!",
        "color" => 0x00FFCC,
        "fields" => [
            ["name" => "🌐 IP Address", "value" => "`{$ip}`", "inline" => true],
            ["name" => "📍 Lokasi", "value" => "{$record['location']}", "inline" => true],
            ["name" => "📡 Provider / ISP", "value" => "{$isp}", "inline" => true],
            ["name" => "🗺️ Google Maps", "value" => "[Buka Peta Lokasi]({$mapsLink})", "inline" => false],
            ["name" => "📱 Perangkat", "value" => substr($userAgent, 0, 150), "inline" => false],
            ["name" => "⏰ Waktu Akses", "value" => $timestamp, "inline" => true],
        ],
        "footer" => ["text" => "Zero-Gravity Telemetry System"]
    ];

    $payload = json_encode(["embeds" => [$embed]]);
    @file_get_contents($DISCORD_WEBHOOK_URL, false, stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 3
        ]
    ]));
}

// Kirim ke Telegram Bot jika diisi
if (!empty($TELEGRAM_BOT_TOKEN) && !empty($TELEGRAM_CHAT_ID)) {
    $msg = "🚨 *PENGUNJUNG TERLACAK!*\n\n"
         . "🌐 *IP:* `{$ip}`\n"
         . "📍 *Lokasi:* {$record['location']}\n"
         . "📡 *ISP:* {$isp}\n"
         . "🗺️ *Maps:* {$mapsLink}\n"
         . "⏰ *Waktu:* {$timestamp}";

    $tgUrl = "https://api.telegram.org/bot{$TELEGRAM_BOT_TOKEN}/sendMessage";
    $tgData = [
        'chat_id' => $TELEGRAM_CHAT_ID,
        'text' => $msg,
        'parse_mode' => 'Markdown'
    ];
    @file_get_contents($tgUrl, false, stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query($tgData),
            'timeout' => 3
        ]
    ]));
}

// Kirim ke Email resmi Farrij (contact.farrij@gmail.com) jika mail() tersedia
if (!empty($TARGET_EMAIL)) {
    $subject = "🚨 [Radar Portofolio] Pengunjung Terlacak: " . ($record['location'] ?: 'Lokasi Tidak Diketahui');
    $mailBody = "Pengunjung baru membuka portofolio Farrij:\n\n"
              . "🌐 IP Address  : {$ip}\n"
              . "📍 Lokasi      : {$record['location']}\n"
              . "🗺️ Google Maps : {$mapsLink}\n"
              . "📡 Provider/ISP: {$isp}\n"
              . "📱 Perangkat   : {$userAgent}\n"
              . "🖥️ Resolusi    : {$screen}\n"
              . "⏰ Waktu Akses : {$timestamp} WIB\n"
              . "🔗 Referrer    : {$referer}\n";
    $headers = "From: Telemetry Radar <telemetry@farrij.portfolio>\r\n"
             . "Reply-To: no-reply@farrij.portfolio\r\n"
             . "X-Mailer: PHP/" . phpversion();
    @mail($TARGET_EMAIL, $subject, $mailBody, $headers);
}

echo json_encode([
    'status'  => 'success',
    'message' => 'Visitor location logged successfully',
    'tracked' => $record
]);
