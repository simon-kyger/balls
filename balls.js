//setup
let balls = [];
let ball = function(){ return { weight: 0 }};
for (let i=0; i<8; i++){
	balls.push(new ball);
}
let randindex = Math.floor(Math.random()*(balls.length-1));
let differentweight = Math.random() > .5 ? 1 : -1;
balls[randindex].weight = differentweight;
let message = 'Ball ';
let weighs = 0;


//test
//weigh 1
weighs++;
if ((balls[0].weight + balls[1].weight) == (balls[2].weight + balls[3].weight)){
	//balls[0-3] are the same so sending one of those as a reference as first arg, and then the unknowns after
	remainingtwoweighs(balls[0], balls[4], balls[5], balls[6], balls[7]);
} else{
	//balls[4-7] are the same so sending one of those as a reference as first arg, and then the unknowns after
	remainingtwoweighs(balls[7], balls[0], balls[1], balls[2], balls[3]);
}

function remainingtwoweighs(np, arg0, arg1, arg2, arg3){
	weighs++;
	if ((np.weight+arg0.weight) == (arg1.weight+arg2.weight)){
		//if the case is that all of those are the same, then the problem has to be only with final argument
		//check against one that IS good.  this is the easy case
		weighs++;
		if (np.weight < arg3.weight) 
			message += balls.indexOf(arg3) + 1 + ' is heavier than the rest. ';
		else
			message += balls.indexOf(arg3) + 1 + ' is lighter than the rest. ';
	} else if (np.weight+arg0.weight > arg1.weight+arg2.weight){
		//in this case, arg0 is either heavier than all (because np is not a problem), or (arg1 or arg2) are lighter than the rest only;
		//therefore, in order to figure out amongst the three who the culprit is, we check against the two lighter mods first.
		//if they are equivalent, then arg0 must be heavy.

		//also note:
		//we are only concerned with the relationship between arg1 and arg2 and no other calculation (or weigh) is made, even with the else if blocks.
		//because basically one relationship check can have three states.  either equivalent, less than, or greater than. nothing else.
		weighs++;
		if 	(arg1.weight == arg2.weight)
			message += balls.indexOf(arg0) + 1 + ' is heavier than the rest. ';
		else if (arg1.weight < arg2.weight)
			message += balls.indexOf(arg1) + 1 + ' is lighter than the rest. ';
		else if (arg1.weight > arg2.weight)
			message += balls.indexOf(arg2) + 1 + ' is lighter than the rest. ';		
	} else if (np.weight+arg0.weight < arg1.weight+arg2.weight){
		//in this case, arg0 is either lighter than all (because np is not a problem), or (arg1 or arg2) are heavier than the rest only;
		//therefore, in order to figure out amongst the three who the culprit is, we check against the two heavier mods first.
		//if they are equivalent, then arg0 must be light.

		//also note:
		//we are only concerned with the relationship between arg1 and arg2 and no other calculation (or weigh) is made, even with the else if.
		//because basically one relationship check can have three states.  either equivalent, less than, or greater than. nothing else.
		weighs++;
		if 	(arg1.weight == arg2.weight)
			message += balls.indexOf(arg0) + 1 + ' is lighter than the rest. ';
		else if (arg1.weight < arg2.weight)
			message += balls.indexOf(arg2) + 1 + ' is heavier than the rest. ';
		else if (arg1.weight > arg2.weight)
			message += balls.indexOf(arg1) + 1 + ' is heavier than the rest. ';
	}
}

document.addEventListener("DOMContentLoaded", function(e) {
	let p = document.createElement("p");
	document.body.appendChild(p);
	p.innerHTML = `${message} <br>
	               Weighs used: ${weighs} <br>
	               Balls array: ${JSON.stringify(balls)}`;
});