<?php
 header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Type: application/json'); // Correcting Content-Type to JSON

echo json_encode('success');//sends success for react frontend to redirect to sign in page



?>