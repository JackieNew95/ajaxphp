$(function(){
	let tbody=$('tbody');

    let tips=$('.tips');
    $(document).ajaxStart(function () {
        tips.animate({width:'80%'});
    });
    $(document).ajaxComplete(function () {
        tips.animate({width:'100%'}).queue(function () {
            $(this).width(0);
        });//通过队列实现完成上移动作后再执行某动作
    });

	//query
	
	$.ajax({
		type:"get",
		url:"query1.php",
		dataType:"json",
		success:function(data){
			$.each(data,function(index,element){
				creatTr(element);
			})
			//jq写法
		}
	});
	
	tbody.on('dblclick','td[class!=del]',function(e){
		let element=$(e.target);
		let oval=element.text();
		element.text('');
		$('<input>').appendTo(element).val(oval).blur(function(){
			let nval=$(this).val();
			$(this).remove();
			element.text(nval);
			let info=element.attr('type');
			let id=element.closest('tr').attr('id');
			console.log(nval,info,id);
			$.ajax({
				url:'update1.php',
				data:{value:nval,info,id},
				success:function(data){
					if(data){
						alert('修改成功');
					}else{
						alert('修改失败');
					}
				}
			})
		})
	});
	//修改

    tbody.on('dblclick','.del',function (e) {
        let element=$(e.target);
        let id=element.closest('tr').attr('id');
        let tr=element.closest('tr');
        tr.remove();
        $.ajax({
            url:'delete1.php',
            method:'get',
            data:{id},
            success:function(data){
                if(data){
                    alert('删除成功');
                }else{
                    alert('删除失败');
                }
            }
        })
    });
    //删除

    $('.addBtn1').on('click',function () {
        $.ajax({
            url:'add1.php',
			method:'get',
            success:function(data){
                creatTr({
					aid:data,
					aname:'',
					pinyin:'',
					tel:''
                });
            }
        })
    });
    //添加

    function creatTr(data){
		tbody.html(function(index,value){
			return value+`
			<tr id=${data.aid}>
				<td type="aname">${data.aname}</td>
				<td type="pinyin">${data.pinyin}</td>
				<td type="tel">${data.tel}</td>
				<td class='del'><button class="delBtn">删除</button></td>
			</tr>
		`
		//jq写法
		})
	}	
});
