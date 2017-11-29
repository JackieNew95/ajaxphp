<?php
    class shop{
        function __construct()
        {
            $obj=new db();
            $this->mysql=$obj->mysql;
        }
        function index(){
            include 'App/views/shop.html';
        }
        function query(){
            $sql="select * from shop";
//            $data=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);//方法一

            $result=$this->mysql->query($sql);
            $data=[];
            while($row=$result->fetch_assoc()){
                array_push($data,$row);
            }//方法二

            echo json_encode($data);
        }
        function shopSure(){
            include 'App/views/order.html';
        }
        function submit(){
            $order=$_REQUEST['order'];
            $orderObj=json_decode($order);//将字符串转换成对象

            $sql="insert into orders (`user`,`status`) values ('njq',0)";
            $this->mysql->autocommit(false);//这句写上后执行语句可撤销,类似于事务
            $this->mysql->query($sql);
            $oid=$this->mysql->insert_id;//在数据表中插入的id

            $str='';
            for($i=0;$i<count($orderObj);$i++){
                $str .='(';
                foreach($orderObj[$i] as $v){
                    $str .=$v .',';
                }
                $str .=$oid .'),';
            }
            $str=substr($str,0,-1);

            $sql1="insert into orderextra (`sid`,`count`,`total`,`oid`) values" .$str;
            $this->mysql->query($sql1);
            if ($this->mysql->affected_rows>0){
                $this->mysql->commit();//这句写上后执行语句可撤销,类似于事务
                echo 'ok';
            }else{
                $this->mysql->rollback();//这句写上后执行语句可撤销,类似于事务
                echo 'error';
            }
            $this->mysql->autocommit(true);//这句写上后执行语句可撤销,类似于事务
        }
        function orderSuccess(){
            include 'App/views/ordersuccess.html';
        }
    }