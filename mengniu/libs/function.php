<?php
/*用来获取栏目、操作栏目的*/
class unit{
    function __construct()//两个下划线，前面可以写public,private等
    {
        $this->str='';
        $this->parentid=null;
    }
    /*
     * cateTree(0,$mysql,'catagory',0)//父栏目id,资源（访问资源的句柄）,表名,层级标记
     *
     * */
    function cateTree($pid,$db,$table,$flag,$current=null){
        $flag++;

        if($current){
            $sql="select * from $table where cid={$current}";
            $data=$db->query($sql)->fetch_assoc();
            $this->parentid=$data['pid'];
        }

        $sql="select * from $table where pid={$pid}";
        $result=$db->query($sql);
        while ($row=$result->fetch_assoc()){
            $heng=str_repeat('*',$flag);
            if($row['cid']==$this->parentid){
                $this->str.="
                <option value='{$row['cid']}' selected>{$heng}{$row['cname']}</option>
            ";
            }else{
                $this->str.="
                <option value='{$row['cid']}'>{$heng}{$row['cname']}</option>
            ";
            }
            $this->cateTree($row['cid'],$db,$table,$flag,$current=null);
        }
        return $this->str;
    }

    function cateTale($db,$table){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['cid']}</td>
                    <td>{$data[$i]['cname']}</td>
                    <td>{$data[$i]['pid']}</td>
                    <td>{$data[$i]['templet']}</td>
                    <td>{$data[$i]['addtemplet']}</td>
                    <td>
                        <a href=\"deleteCategory.php?cid={$data[$i]['cid']}\" class=\"btn btnAdd\">删除</a>
                        <a href=\"updateCategory.php?cid={$data[$i]['cid']}\" class=\"btn btnDel\">修改</a>
                    </td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }

    function selectOne($db,$table,$id,$attr){
        $sql="select $attr from $table where cid='{$id}'";
        $data=$db->query($sql)->fetch_assoc();
        $cname=$data[$attr];
        return $cname;
    }

    function showArticle1($db,$table,$cid){
        $sql="select * from $table where cid=$cid";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['did']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['dtitle']}' alt=''></td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['dbg']}' alt=''></td>
                    <td>{$data[$i]['atitle']}</td>
                    <td>{$data[$i]['acontent']}</td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['aimg']}' alt=''></td>
                    <td>
                        <a href=\"deleteArticle1.php?did={$data[$i]['did']}\" class=\"btn btnAdd\">删除</a>
                        <a href=\"updateArticle1.php?did={$data[$i]['did']}\" class=\"btn btnDel\">修改</a>
                    </td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }
    function showArticle2($db,$table){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['did']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['dtitle']}' alt=''></td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['dbg']}' alt=''></td>
                    <td>{$data[$i]['atitle']}</td>
                    <td>{$data[$i]['acontent']}</td>
                    <td><img src='../static/img/index/detailcontent/{$data[$i]['aimg']}' alt=''></td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }

    function shownavcontent1($db,$table,$cid){
        $sql="select * from $table where cid=$cid";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['navid']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['ctitle']}' alt=''></td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['cslogan']}' alt=''></td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['cimg']}' alt=''></td>
                    <td>
                        <a href=\"deletenavcontent.php?navid={$data[$i]['navid']}\" class=\"btn btnAdd\">删除</a>
                        <a href=\"updatenavcontent.php?cid=$cid&navid={$data[$i]['navid']}\" class=\"btn btnDel\">修改</a>
                    </td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }
    function shownavcontent2($db,$table){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['navid']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['ctitle']}' alt=''></td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['cslogan']}' alt=''></td>
                    <td><img src='../static/img/index/nav/{$data[$i]['cid']}/{$data[$i]['cimg']}' alt=''></td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }


    function showproductlist($db,$table){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['proid']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td><img src='../static/img/index/product/{$data[$i]['proname']}' alt=''></td>
                    <td>{$data[$i]['prolink']}</td>
                    <td>
                        <a href=\"deleteproductlist.php?proid={$data[$i]['proid']}\" class=\"btn btnAdd\">删除</a>
                        <a href=\"updateproductlist.php?proid={$data[$i]['proid']}\" class=\"btn btnDel\">修改</a>
                    </td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }


    function showbuy1($db,$table){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['bid']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td>{$data[$i]['link']}</td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }

    function showbuy2($db,$table,$cid){
        $sql="select * from $table";
        $data=$db->query($sql)->fetch_all(1);
        for ($i=0;$i<count($data);$i++){
            $this->str.="
                <tr>
                    <td>{$data[$i]['bid']}</td>
                    <td>{$data[$i]['cid']}</td>
                    <td>{$data[$i]['link']}</td>
                    <td>
                        <a href=\"deletebuy.php?bid={$data[$i]['bid']}\" class=\"btn btnAdd\">删除</a>
                        <a href=\"updatebuy.php?cid=$cid&bid={$data[$i]['bid']}\" class=\"btn btnDel\">修改</a>
                    </td>
                </tr>
            ";//使用表单时需要通过地址栏传递信息
        }
        return $this->str;
    }

}






//$data->fetch_accoc();每一次遍历时将第一条转换为关联数组 ，结果是一维数组，
//将所有的转换为关联数组，结果为二维数组