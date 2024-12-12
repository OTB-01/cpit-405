<?php

class Todo{
    private $id;
    private $task;
    private $date_added;
    private $done = false;
    private $dbConnection;
    private $dbTable='tasks';


    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }
    // getters
    public function getId()
    {
        return $this->id;
    }
    public function getTask()
    {
        return $this->task;
    }
    public function getDone()
    {
        return $this->done;
    }
    public function getDateAdded()
    {
        return $this->date_added;
    }

    // setters
    public function setId($id)
    {
        $this->id = $id;
    }
    public function setTask($task)
    {
        $this->task = $task;
    }
    public function setDone($done)
    {
        $this->done = $done;
    }
    public function setDateAdded($date_added)
    {
        $this->date_added = $date_added;
    }


    public function create(){
        $query = "INSERT INTO " .$this->dbTable." (task, date_added, done) VALUES (:taskName, NOW(), false)";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':taskName', $this->task);
        if($stmt->execute()){
            return true;
        }
        printf("Error: %s", $stmt->error);
        return false;
    }

    public function readOne(){
        $query = "SELECT * FROM " . $this->dbTable . " WHERE id = :id";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute() && $stmt->rowCount()==1){
            $result = $stmt->fetch(PDO::FETCH_OBJ);
            $this->id = $result->id;
            $this->task = $result->task;
            $this->date_added = $result->date_added;
            $this->done = $result->done;
            return true;
        }
        return false;
    }

    public function readAll(){
        $query = "SELECT * FROM " . $this->dbTable . " WHERE done = false";
        $stmt = $this->dbConnection->prepare($query);

        if($stmt->execute() && $stmt->rowCount() > 0){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return [];
    }

    public function update(){
        $query = "UPDATE " . $this->dbTable . " SET done=:done WHERE id=:id";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':done', $this->done);
        $stmt->bindParam(':id', $this->id);
        if($stmt->execute() && $stmt->rowCount() == 1){
            return true;
        }
        return false;
    }

    public function delete(){
        $query = "DELETE FROM " . $this->dbTable . " WHERE id=:id";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(':id', $this->id);
        if($stmt->execute() && $stmt->rowCount() == 1){
            return true;
        }
        return false;
    }
}