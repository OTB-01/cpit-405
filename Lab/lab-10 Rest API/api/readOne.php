<?php
// check HTTP request method
if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    header("Allow: GET");
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

// set HTTP response header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

// include database and model files
include_once '../db/database.php';
include_once '../models/Todo.php';

// instantiate database and connect
$database = new Database();
$dbConnection = $database->connect();

// instantiate a Todo object
$todo = new Todo($dbConnection);


// get the HTTP GET query parameters (example ?id=140)
if(!isset($_GET['id'])){
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error missing required query parameter id.')
    );
    return; 
}


$todo->setId($_GET['id']);
if($todo->readOne()){
    $result = array(
        'id' => $todo->getId(),
        'task' => $todo->getTask(),
        'done' => $todo->getDone(),
        'date_added' => $todo->getDateAdded()
    );
    echo json_encode($result);
}
else{
    http_response_code(404);
    echo json_encode(
        array('message' => 'Error: no such todo item')
    );
}