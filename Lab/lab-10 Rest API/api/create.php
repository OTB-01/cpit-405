<?php
// check HTTP request method
if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    header("Allow: POST");
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

// set HTTP response header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

// include database and model files
include_once '../db/database.php';
include_once '../models/Todo.php';

// instantiate database and connect
$database = new Database();
$dbConnection = $database->connect();

// instantiate a Todo object
$todo = new Todo($dbConnection);

// Get the HTTP POST request JSON body
$data = json_decode(file_get_contents("php://input"), true);

// if no task is included in the json body, return error
if(!$data || !isset($data['task'])) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required parameter')
    );
    return;
}

// create a todo item
$todo->setTask($data['task']);
if($todo->create()) {
    echo json_encode(
        array('message' => 'A Todo item created')
    );
} else {
    echo json_encode(
        array('message' => 'Error no todo item was created')
    );
}


