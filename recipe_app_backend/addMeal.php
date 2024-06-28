<?php
// addMeal.php

// Database connection
require_once 'db.php'; // Include your database connection script



header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Type: application/json'); // Correcting Content-Type to JSON















if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

// {
//     echo json_encode(['error' => 'Method not allowed']);
//     exit;
// }

// Example validation - Ensure required fields are present
// $requiredFields = ['idMeal', 'strMeal', 'strCategory', 'strArea', 'strTags', 'ingredients', 'strInstructions'];
// foreach ($requiredFields as $field) {
//     if (!isset($_POST[$field])) {
//         echo json_encode(['error' => 'Missing required fields']);
//         exit;
//     }
// }

$con=mysqli_connect("localhost","root","","recipe_app");

// Process form data
// $idMeal = $_POST['idMeal'];
// $strMeal = $_POST['strMeal'];
// $strCategory = $_POST['strCategory'];
// $strArea = $_POST['strArea'];
// $strTags = $_POST['strTags'];
$data = file_get_contents("php://input");
$user=json_decode($data,true);
echo $user;


// $ingredients = json_decode($_POST['ingredients'], true); // Convert JSON to PHP array
// $strInstructions = $_POST['strInstructions'];

$sql="insert into meal (`strMeal`) values ('$user')";
$res=mysqli_query($con , $sql);
if($res){
    echo json_encode("success");
}

// try {
//     // Insert new meal into database
//     $stmt = $pdo->prepare('INSERT INTO meals (strMeal) VALUES ( ?)');
//     $stmt->execute([$strMeal]);

//     echo json_encode('success');
// } catch (PDOException $e) {
//     echo json_encode(['status' => 'error', 'message' => 'Failed to add meal: ' . $e->getMessage()]);
// }
}
?>
