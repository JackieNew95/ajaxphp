<?php
    class sing{
        function __construct()
        {
            $obj=new db();
            $this->mysql=$obj->mysql;
        }
        function index(){
            $sql="select * from singertype";
            $result=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
            include 'App/views/singer.html';
        }
        function paihang(){
            include 'App/views/paihang.html';
        }
        function paihangsearch(){
            $sql="select * from singers order by hits DESC limit 0,10";
            $result=$this->mysql->query($sql)->fetch_all(MYSQL_ASSOC);
            echo json_encode($result);
        }
        function select(){
            $tid=$_REQUEST['tid'];
            $data=$this->mysql->query("select * from singers where tid=$tid")->fetch_all(MYSQL_ASSOC);
            $tname=$this->mysql->query("select * from singertype where tid=$tid")->fetch_assoc();

            include 'App/views/singerlist.html';
        }
        function songslist(){
            $sid=$_REQUEST['sid'];
            $songs=$this->mysql->query("select * from songs where sid=$sid")->fetch_all(MYSQL_ASSOC);
            $singer=$this->mysql->query("select * from singers where sid=$sid")->fetch_assoc();
            $tname=$this->mysql->query("select * from singertype where tid={$singer['tid']}")->fetch_assoc();
            include 'App/views/songslist.html';
        }

        function songsalready(){
            include 'App/views/songsalready.html';
        }
        function songsalreadydata(){
            $sid=$_REQUEST['sid'];
            $data=$this->mysql->query("select * from singers where sid=$sid")->fetch_assoc();
            echo json_encode($data);
        }
        function play(){
            include 'App/views/play.html';
        }
        function playsearch(){
            $sid=$_GET['sid'];
            $gid=$_GET['gid'];
            $singer=$this->mysql->query("select * from singers where sid=$sid")->fetch_assoc();
            $song=$this->mysql->query("select * from songs where gid=$gid")->fetch_assoc();
            $data=[$singer,$song];
            echo json_encode($data);
        }

    }