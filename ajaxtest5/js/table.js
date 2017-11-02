$(function(){
	let tbody=$('tbody');

	//query
	
	$.ajax({
		type:"get",
		url:"js/query.php",
		dataType:"json",
		success:function(data){
/*			data.forEach(element=>{
				creatTr(element);
			});
			//原生js写法
			*/
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
			
			$.ajax({
				url:'js/update.php',
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
            url:'js/delete.php',
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

    $('.addBtn').on('click',function () {
        $.ajax({
            url:'js/add.php',
			method:'get',
            success:function(data){
            	console.log(data);
                creatTr({
					id:data,
					name:'',
					sex:'',
					age:'',
					classes:'',
					address:'',
					tel:''
                });
            }
        })
    });
    //添加

    function creatTr(data){
/*		tbody[0].innerHTML+=`
			<tr>
				<td>${data.name}</td>
				<td>${data.sex}</td>
				<td>${data.age}</td>
				<td>${data.classes}</td>
				<td>${data.address}</td>
				<td>${data.tel}</td>
				<td class='del'><button class="delBtn">删除</button></td>
			</tr>
		`
		//原生js写法
		*/
		tbody.html(function(index,value){
			return value+`
			<tr id=${data.id}>
				<td type="name">${data.name}</td>
				<td type="sex">${data.sex}</td>
				<td type="age">${data.age}</td>
				<td type="classes">${data.classes}</td>
				<td type="address">${data.address}</td>
				<td type="tel">${data.tel}</td>
				<td class='del'><button class="delBtn">删除</button></td>
			</tr>
		`
		//jq写法
		})
	}	
})
