<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

$message = $_POST['message'] ?? '';

if (!$message) {
  echo "Please enter your question.";
  exit;
}

$apiKey = "YOUR_OPENAI_API_KEY"; // ← badilisha na key yako halali

$data = [
  "model" => "gpt-3.5-turbo",
  "messages" => [
    ["role" => "system", "content" => "You are a business education assistant for Kplus712. Respond clearly and concisely in any language."],
    ["role" => "user", "content" => $message]
  ]
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
echo $result['choices'][0]['message']['content'] ?? "Sorry, I could not understand that.";
?>
