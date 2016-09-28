<?php
    $ch = curl_init();
    $url = "http://apis.baidu.com/txapi/world/world?num=10&page=".$_GET['page'];
    $header = array(
        'apikey: 5e7ac277afe4a93180724c96a31781ab',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    // var_dump(json_decode($res,ture));
   // var_dump($res);
    echo $res;
?>