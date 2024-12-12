<?php
// check HTTP request method
if($_SERVER['REQUEST_METHOD'] !== 'PUT'){
    header("Allow: PUT");
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

// set HTTP response header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');

// include database and model files
include_once '../db/database.php';
include_once '../models/Todo.php';

// instantiate database and connect
$database = new Database();
$dbConnection = $database->connect();

// instantiate a Todo object
$todo = new Todo($dbConnection);

// GET the HTTP PUT request JSON body
$data = json_decode(file_get_contents("php://input"));


if(!$data || !$data->id || !$data->done){
    http_response_code(422);
    echo json_encode(
        array('message' => 'missing required parameter(s) id or done in the JSON body')
    );
    return;
}

// update the todo item
$todo->setId($data->id);
$todo->setDone($data->done);
if($todo->update()){
    echo json_encode(
        array('message' => 'Todo item updated')
    );
}else{
    echo json_encode(
        array('message' => 'Todo item not updated')
    );
}
