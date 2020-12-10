<?php

include('database.php');
if (isset($_POST['el'])){
    $var = $_POST['el'];

    $query = "DELETE FROM tasks WHERE ID = $var";
    $res = mysqli_query($conn, $query);
    if (!$res):
        die('Wrong delete!'.mysqli_error($conn));
    endif;

}