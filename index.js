var	query = require('cli-interact').getNumber;
var readlineSync = require('readline-sync');
// var answer = query('Is it true');
// console.log('you answered:', answer);
// var readlineSync = require('readline-sync');

//   answer = readlineSync.question('What is your favorite food? :');

//   console.log(answer);
var allStu = [];
function menu(){
	return query('1. 添加学生\n2. 生成成绩单\n3. 退出\n请输入你的选择（1～3）\n');
}
function check(answer){
	var temp = 0;
	var arr = answer.split(',');
	if(typeof(Number(arr[2]))!='number'||typeof(Number(arr[3]))!='number'||typeof(Number(arr[4]))!='number'||typeof(Number(arr[5]))!='number'||typeof(Number(arr[6]))!='number'){
		temp = 1;
	}
	return temp;
}
function appendStudent(){
	var answer = readlineSync.question('请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：\n');
	var temp = check(answer);
	while(temp){
		answer = readlineSync.question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n');
		temp = check(answer);
	}
	var arr = answer.split(',');
	var stu = {};
	stu.name = arr[0];
	stu.num = Number(arr[1]);
	stu.class = Number(arr[2]);
	stu.math = Number(arr[3]);
	stu.chinese = Number(arr[4]);
	stu.eng = Number(arr[5]);
	stu.code = Number(arr[6]);
	stu.sum = stu.math + stu.code +stu.chinese + stu.eng;
	stu.avg = stu.sum/4;
	allStu.push(stu);
	reload();

}
function reload(){
	switch(menu()){
		case 1:appendStudent();break;
		case 2:find();break;
		default:break;
	}
}
function printf(stu){
	var text = stu.name+'|'+stu.math+'|'+stu.chinese+'|'+stu.eng+'|'+stu.code+'|'+stu.avg+'|'+stu.sum;
	console.log(text);
}
function classSum(){
	var sum = 0;
	for(var i in allStu){
		sum += allStu[i].sum;
	}
	return sum/allStu.length;
}
function classMid(){
	var arr = [];
	for(var i in allStu){
		arr.push(allStu[i].sum);
	}
	arr.sort(function(a,b){return a-b});
	if(arr.length%2!=0){
		return arr[Math.floor(arr.length/2)];
	}else {
		return (arr[arr.length/2]+arr[arr.length/2-1])/2;
	}
}
function find(){
	var number = readlineSync.question('xuehao\n');
	number = number.split(',');
	console.log('成绩单');
	console.log('姓名|数学|语文|英语|编程|平均分|总分');
	console.log('========================');
	for(var value of number){
		for(var i in allStu){
			if(allStu[i].num==Number(value)){
				printf(allStu[i]);
			}			
		}
	}
	console.log('========================');
	console.log('全班总分平均数：'+classSum());
	console.log('全班总分中位数：'+classMid());
	reload();
}
function main(){
	reload();

}
main();