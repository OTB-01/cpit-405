<?php
// check HTTP request method
if($_SERVER['REQUEST_METHOD'] !== 'DELETE'){
    header("Allow: DELETE");
    http_response_code(405);
    echo json_encode(
        array('message' => 'Method not allowed')
    );
    return;
}

// set HTTP response header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

// include database and model files
include_once '../db/database.php';
include_once '../models/Todo.php';

// instantiate database and connect
$database = new Database();
$dbConnection = $database->connect();

// instantiate a Todo object
$todo = new Todo($dbConnection);

// GET the HTTP DELETE request JSON body
$data = json_decode(file_get_contents("php://input"));


if(!$data || !$data->id){
    http_response_code(422);
    echo json_encode(
        array('message' => 'missing required parameter id in the JSON body')
    );
    return;
}

// DELETE the todo item
$todo->setId($data->id);
if($todo->delete()){
    echo json_encode(
        array('message' => 'Todo item deleted')
    );
}else{
    echo json_encode(
        array('message' => 'Todo item not deleted')
    );
}
