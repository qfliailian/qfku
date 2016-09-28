<?php 
$id = 'id='.$_REQUEST['id'];
$url = "http://music.163.com/#/song?".$id;
$ret = file_get_contents($url); 
// $begin=change_match_string('<div');
// $end=change_match_string('<br><br></div>');
// $p = "{$begin}(.*){$end}";
// if (eregi($p,$ret,$rs)) echo json_encode($rs[1]);
// else                    echo json_encode(null);

echo json_encode($ret)
?> 

