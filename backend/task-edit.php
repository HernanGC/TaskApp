<?php

include('database.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE tasks SET name = '$name', description = '$description' WHERE id = $id";
    $res = mysqli_query($conn, $query);
    if(!$res){
        die('Update failed '.mysqli_error($conn));
    }
    
    echo 'Updated succesfully!';
}