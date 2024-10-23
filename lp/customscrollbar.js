{
	let customScrollBarStyles = document.createElement("style");
	customScrollBarStyles.innerHTML = ".customScrollBarTarget{-ms-overflow-style:none;scrollbar-width:none}.customScrollBarTarget::-webkit-scrollbar{display:none}.customScrollBarTargetDraggable,.customScrollBarTargetScrollBar{cursor:pointer}";
	document.querySelector("body").appendChild(customScrollBarStyles);
}
var CustomScrollBar = {
	currentGrabObject : null,
	set: function(
		targetArea,
		targetScrollBarVertical,
		targetScrollBarPointerVertical,
		targetScrollBarHorizontal,
		targetScrollBarPointerHorizontal,
		isDraggable=true
	){
		var scrollBar = {
			isTouched: false,
			grabObject: null,
			targetArea: targetArea,
			targetScrollBarVertical: targetScrollBarVertical,
			targetScrollBarPointerVertical: targetScrollBarPointerVertical,
			targetScrollBarHorizontal: targetScrollBarHorizontal,
			targetScrollBarPointerHorizontal: targetScrollBarPointerHorizontal,
		};
		targetArea.addEventListener("recalc",{
			scrollBar: scrollBar,
			handleEvent: CustomScrollBar.handler,
		},{passive:true});
		targetArea.addEventListener("scroll",{
			scrollBar: scrollBar,
			handleEvent: CustomScrollBar.handler,
		},{passive:true});
		window.addEventListener("resize",{
			scrollBar: scrollBar,
			handleEvent: CustomScrollBar.handler,
		},{passive:true});
		if(isDraggable){
			CustomScrollBar.draggable(targetArea);
			targetArea.classList.add("customScrollBarTargetDraggable");
		}
		targetArea.classList.add("customScrollBarTarget");

		if(targetScrollBarVertical){
			targetScrollBarVertical.addEventListener("mousedown",{
				scrollBar: scrollBar,
				direction: 'vertical',
				handleEvent: CustomScrollBar.pointerGrab,
			},{passive:true});
			targetScrollBarVertical.addEventListener("touchstart",{
				scrollBar: scrollBar,
				direction: 'vertical',
				handleEvent: CustomScrollBar.pointerGrab,
			},{passive:true});
			targetScrollBarVertical.classList.add("customScrollBarTargetScrollBar");
		}

		if(targetScrollBarHorizontal){
			targetScrollBarHorizontal.addEventListener("mousedown",{
				scrollBar: scrollBar,
				direction: 'horizontal',
				handleEvent: CustomScrollBar.pointerGrab,
			},{passive:true});
			targetScrollBarHorizontal.addEventListener("touchstart",{
				scrollBar: scrollBar,
				direction: 'horizontal',
				handleEvent: CustomScrollBar.pointerGrab,
			},{passive:true});
			targetScrollBarHorizontal.classList.add("customScrollBarTargetScrollBar");
		}
	},

	handler: function(e){
		CustomScrollBar.update(
			this.scrollBar.targetArea,
			this.scrollBar.targetScrollBarVertical,
			this.scrollBar.targetScrollBarPointerVertical,
			this.scrollBar.targetScrollBarHorizontal,
			this.scrollBar.targetScrollBarPointerHorizontal
		);
	},

	pointerGrab: function(e){
		if(e.type === "touchstart"){
			this.scrollBar.isTouched = true;
			let bounding = null;
			if(this.direction === "vertical"){
				bounding = this.scrollBar.targetScrollBarVertical.getBoundingClientRect();
			}else if(this.direction === "horizontal"){
				bounding = this.scrollBar.targetScrollBarHorizontal.getBoundingClientRect();
			}
			CustomScrollBar.update(
				this.scrollBar.targetArea,
				this.scrollBar.targetScrollBarVertical,
				this.scrollBar.targetScrollBarPointerVertical,
				this.scrollBar.targetScrollBarHorizontal,
				this.scrollBar.targetScrollBarPointerHorizontal,
				{
					x: e.touches[0].clientX - bounding.left,
					y: e.touches[0].clientY - bounding.top,
					dir: this.direction,
				},
			);
		}
		else if(e.type === "mousedown" && !this.scrollBar.isTouched){
			let bounding = null;
			if(this.direction === "vertical"){
				bounding = this.scrollBar.targetScrollBarVertical.getBoundingClientRect();
			}else if(this.direction === "horizontal"){
				bounding = this.scrollBar.targetScrollBarHorizontal.getBoundingClientRect();
			}
			CustomScrollBar.update(
				this.scrollBar.targetArea,
				this.scrollBar.targetScrollBarVertical,
				this.scrollBar.targetScrollBarPointerVertical,
				this.scrollBar.targetScrollBarHorizontal,
				this.scrollBar.targetScrollBarPointerHorizontal,
				{
					x: e.clientX - bounding.left,
					y: e.clientY - bounding.top,
					dir: this.direction,
				}
			);
		}
		CustomScrollBar.currentGrabObject = {
			direction: this.direction,
			scrollBar: this.scrollBar,
		};
	},

	pointerMove: function(e){
		let delta = null;
		if(e.type === "touchmove" && CustomScrollBar.currentGrabObject !== null){
			e.preventDefault();
			e.stopPropagation();
			let x = 0;
			let y = 0;
			if(CustomScrollBar.currentGrabObject.direction === "vertical"){
				let bounding = CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarVertical.getBoundingClientRect();
				x = 0;
				y = e.touches[0].clientY - bounding.top;
			}
			else if(CustomScrollBar.currentGrabObject.direction === "horizontal"){
				let bounding = CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarHorizontal.getBoundingClientRect();
				x = e.touches[0].clientX - bounding.left;
				y = 0;
			}
			CustomScrollBar.update(
				CustomScrollBar.currentGrabObject.scrollBar.targetArea,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarVertical,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarPointerVertical,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarHorizontal,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarPointerHorizontal,
				{
					x: x,
					y: y,
					dir: CustomScrollBar.currentGrabObject.direction,
				},
			);
		}
		else if(e.type === "mousemove" && CustomScrollBar.currentGrabObject !== null){
			e.preventDefault();
			e.stopPropagation();
			let x = 0;
			let y = 0;
			if(CustomScrollBar.currentGrabObject.direction === "vertical"){
				let bounding = CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarVertical.getBoundingClientRect();
				x = 0;
				y = e.clientY - bounding.top;
			}
			else if(CustomScrollBar.currentGrabObject.direction === "horizontal"){
				let bounding = CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarHorizontal.getBoundingClientRect();
				x = e.clientX - bounding.left;
				y = 0;
			}
			CustomScrollBar.update(
				CustomScrollBar.currentGrabObject.scrollBar.targetArea,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarVertical,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarPointerVertical,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarHorizontal,
				CustomScrollBar.currentGrabObject.scrollBar.targetScrollBarPointerHorizontal,
				{
					x: x,
					y: y,
					dir: CustomScrollBar.currentGrabObject.direction,
				},
			);
		}
	},

	pointerRelease: function(e){
		CustomScrollBar.currentGrabObject = null;
	},

	update: function(
		targetArea,
		targetScrollBarVertical,
		targetScrollBarPointerVertical,
		targetScrollBarHorizontal,
		targetScrollBarPointerHorizontal,
		forceCord
	){
		if(targetArea.clientHeight==0){return;}

		if(forceCord){
			if(forceCord.dir === 'vertical'){
				let vc = Math.max(0,Math.min(1,
					forceCord.y / targetScrollBarVertical.clientHeight
				));
				targetArea.scrollTop = (targetArea.scrollHeight-targetArea.clientHeight) * vc;
			}
			if(forceCord.dir === 'horizontal'){
				let hc = Math.max(0,Math.min(1,
					forceCord.x / targetScrollBarHorizontal.clientWidth
				));
				targetArea.scrollLeft = (targetArea.scrollWidth-targetArea.clientWidth) * hc;
			}
		}

		if(targetScrollBarVertical){
			let vr = targetArea.scrollTop/(targetArea.scrollHeight-targetArea.clientHeight);
			vr = (targetScrollBarVertical.clientHeight - targetScrollBarPointerVertical.clientHeight) * vr;
			targetScrollBarPointerVertical.style.top = vr+"px";
		}

		if(targetScrollBarHorizontal){
			let hr = targetArea.scrollLeft/(targetArea.scrollWidth-targetArea.clientWidth);
			hr = (targetScrollBarHorizontal.clientWidth - targetScrollBarPointerHorizontal.clientWidth) * hr;
			targetScrollBarPointerHorizontal.style.left = hr+"px";
		}
	},

	draggable: function(element){
		let target;

		function handleMouseDown(event) {
			event.preventDefault();
			target = event.currentTarget;
			target.dataset.down = true;
			target.dataset.move = false;
			target.dataset.x = event.clientX;
			target.dataset.y = event.clientY;
			target.dataset.scrollleft = target.scrollLeft;
			target.dataset.scrolltop = target.scrollTop;
			return false;
		}

		function handleClick(event) {
			if (target) {
				if (target.dataset.move === "true") {
					event.preventDefault();
					return false;
				}
				else
				{
					target.dataset.down = false;
					setTimeout(()=>{target=null;},30);
				}
			}
			return true;
		}

		function handleMouseMove(event) {
			if (target && target.dataset.down) {
				event.preventDefault();
				let move_x = target.dataset.x - event.clientX;
				let move_y = target.dataset.y - event.clientY;
				if (move_x !== 0 || move_y !== 0) {
					target.dataset.move = true;
				} else {
					return;
				}
				target.scrollLeft = parseInt(target.dataset.scrollleft) + move_x;
				target.scrollTop = parseInt(target.dataset.scrolltop) + move_y;
				return false;
			}
		}

		function handleMouseUp(event) {
			if (target) {
				target.dataset.down = false;
				if(target.dataset.move === "true"){
					setTimeout(()=>{target=null;},30);
					return false;
				}
			}
		}

		element.addEventListener("mousedown", handleMouseDown);
		element.addEventListener("click", handleClick);

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	},
};
window.addEventListener("mousemove",{
	handleEvent: CustomScrollBar.pointerMove,
},{passive:false});
window.addEventListener("touchmove",{
	handleEvent: CustomScrollBar.pointerMove,
},{passive:false});
window.addEventListener("mouseup",{
	handleEvent: CustomScrollBar.pointerRelease,
},{passive:true});
window.addEventListener("touchend",{
	handleEvent: CustomScrollBar.pointerRelease,
},{passive:true});
