<?php

include('database.php');

if (isset($_POST['name']) && checkLength($_POST['name'], 5) && checkLength($_POST['name'], 5)):
    $name = $_POST['name'];
    $description = $_POST['description'];
    $query = "INSERT INTO tasks (name, description) values ('$name', '$description')";
    $res = mysqli_query($conn, $query);
    if (!$res):
        die('Query failed');
    else:
        echo 'Success task!';
    endif;
endif;

function checkLength($var, $length)
{
    if (strlen($var) > $length){
        return true;
    }
    return false;
}