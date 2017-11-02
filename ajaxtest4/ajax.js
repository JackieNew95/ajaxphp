/*
* @Author: user
* @Date:   2017-10-23 09:16:30
* @Last Modified by:   user
* @Last Modified time: 2017-10-23 10:06:30
*/
/*
	exercise({})

	{method:'get',url:'data.php',data:'name=zhangsan&age=18',dataType='json',success:function(){}}
	method:可选 get(默认值) post
	url:必选 地址
	asynch:可选 是否异步 true(默认) false
	data:可选 发送的数据 'name=zhangsan&age=18' {name:"zhangsan",age:18}
	dataType:可选 接受数据类型 text(默认) json xml
	success:成功

 */

function ajax(options){
	if(!options.url){
		return ;
	}
	/*参数初始化*/
	let method=options.method?options.method:"get";
	let dataType=options.dataType?options.dataType:"text";
	let asynch=options.asynch===undefined?true:options.asynch;
	let data="";

	if(typeof options.data=="string"){
		data=options.data;
	}else if(typeof options.data=="object"){
		for(let i in options.data){
			data+=`${i}=${options.data[i]}&`
		}
		data=data.slice(0,-1);
	}

	let xml=new XMLHttpRequest();
	xml.responseType=dataType;
	if(method=='get'){
		xml.open("get",options.url+"?"+data,asynch)
		xml.send();
	}else if(method=='post'){
		xml.open("post",options.url,asynch);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		if(data){
			xml.send(data);
		}else{
			xml.send(null);
		}
	}
	xml.onreadystatechange=function(){
		if(xml.readyState == 4){
			if(xml.status == 200){
				if(xml.responseType=='text'){
					options.success(xml.responseText);
				}else if(xml.responseType=='json'){
					options.success(xml.response);
				}else if(xml.responseType=='xml'){
					options.success(xml.responseXML);
				}
			}
		}
	}
}