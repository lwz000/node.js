import { defineComponent , ref , reactive , onMounted } from "vue";
export default defineComponent({
    name: "pop",
    setup(props) {

        let last_cx = 10;
        let last_cy = 10;
        let flag = 0;
        let mapp = new Array();
        let bomb_map = new Array();
        let score = 0;
        function clickfun(event) {
            let cx = Math.floor(event.offsetX / 100);
            let cy = Math.floor(event.offsetY / 100);
            if (cx > 7 || cy > 7) {
                console.log(mapp);
                /*for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        mapp[i][j] = 0;
                    }
                }
                full_ball();*/
                return;
            }
            if (last_cx == cx && last_cy == cy && flag == 1) {
                flag = 0;
                clear_box(cx, cy);
                return;
            }
            if (flag == 0) {
                last_cx = cx;
                last_cy = cy;
                flag = 1;
                draw_box(cx, cy);
                return;
            }
            if (flag == 1) {
                if (Math.abs(cx - last_cx) > 1 || Math.abs(cy - last_cy) > 1) {
                    clear_box(last_cx, last_cy);
                    draw_box(cx, cy);
                    last_cx = cx;
                    last_cy = cy;
                    return;
                }
                let temp = mapp[last_cx][last_cy];
                mapp[last_cx][last_cy] = mapp[cx][cy];
                mapp[cx][cy] = temp;
                clear_box(last_cx, last_cy);
                draw_ball(cx, cy, mapp[cx][cy]);
                draw_ball(last_cx, last_cy, mapp[last_cx][last_cy]);
                checkall();
                slide_down_all();
                //full_ball();
                setTimeout(full_ball, 500);
                flag = 0;
                return;
            }
        }
        function move(event) {
            // document.getElementById("xx").innerHTML = event.clientX;
            // document.getElementById("yy").innerHTML = event.clientY;
    
        }
        function create() {
            console.log('aaa');
            for (let i = 0; i < 8; i++) {
                mapp[i] = new Array();
                bomb_map[i] = new Array();
                for (let j = 0; j < 8; j++) {
                    //mapp[i][j]=Math.floor(Math.random()*5+1);
                    mapp[i][j] = 0;
                    bomb_map[i][j] = 0;
                }
            }
    
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            
            full_ball();
            score = 0;
        }
        function draw_ball(x, y, color) {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            let draw_x = Math.round(x * 100 + 10);
            let draw_y = Math.round(y * 100 + 10);
            if (color == 0) {
                return;
            }
            else if (color == 1) {
                ctx.fillStyle = 'red';
            }
            else if (color == 2) {
                ctx.fillStyle = 'orange';
            }
            else if (color == 3) {
                ctx.fillStyle = 'lime'
            }
            else if (color == 4) {
                ctx.fillStyle = 'dodgerblue'
            }
            else if (color == 5) {
                ctx.fillStyle = 'violet'
            }
            else if (color == -1) {
                ctx.fillStyle = 'white'
            }
            let radius = 20;
            ctx.beginPath();
            ctx.arc(draw_x + 20, draw_y + 20, 20, Math.PI, Math.PI + Math.PI / 2, false)
            ctx.arc(draw_x + 60, draw_y + 20, 20, Math.PI + Math.PI / 2, 0, false)
            ctx.arc(draw_x + 60, draw_y + 60, 20, 0, Math.PI / 2, false)
            ctx.arc(draw_x + 20, draw_y + 60, 20, Math.PI / 2, Math.PI, false)
            ctx.closePath();
            //ctx.stroke();
            ctx.fill();
        }
        function clear_ball(x, y) {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            let draw_x = Math.round(x * 100 + 5);
            let draw_y = Math.round(y * 100 + 5);
            ctx.clearRect(draw_x, draw_y, 90, 90);
        }
        function heng(i, j) {
            if (mapp[i][j] == 0) {
                return;
            }
            let num = 1;
            for (let k = 1; j - k >= 0; k++) {
                if (mapp[i][j] == mapp[i][j - k]) {
                    num++;
                }
                else {
                    break;
                }
            }
            for (let k = 1; j + k < 8; k++) {
                if (mapp[i][j] == mapp[i][j + k]) {
                    num++;
                }
                else {
                    break;
                }
            }
            if (num < 3) {
                return;
            }
            bomb_map[i][j] = 1;
            for (let k = 1; j - k >= 0; k++) {
                if (mapp[i][j] == mapp[i][j - k]) {
                    bomb_map[i][j - k] = 1;
                }
                else {
                    break;
                }
            }
            for (let k = 1; j + k < 8; k++) {
                if (mapp[i][j] == mapp[i][j + k]) {
                    bomb_map[i][j + k] = 1;
                }
                else {
                    break;
                }
            }
        }
        function su(i, j) {
            if (mapp[i][j] == 0) {
                return;
            }
            let num = 1;
            for (let k = 1; i - k >= 0; k++) {
                if (mapp[i][j] == mapp[i - k][j]) {
                    num++;
                }
                else {
                    break;
                }
            }
            for (let k = 1; i + k < 8; k++) {
                if (mapp[i][j] == mapp[i + k][j]) {
                    num++;
                }
                else {
                    break;
                }
            }
            if (num < 3) {
                return;
            }
            bomb_map[i][j] = 1;
            for (let k = 0; i - k >= 0; k++) {
                if (mapp[i][j] == mapp[i - k][j]) {
                    bomb_map[i - k][j] = 1;
                }
                else {
                    break;
                }
            }
            for (let k = 0; i + k < 8; k++) {
                if (mapp[i][j] == mapp[i + k][j]) {
                    bomb_map[i + k][j] = 1;
                }
                else {
                    break;
                }
            }
        }
        function checkall() {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    bomb_map[i][j] = 0;
                }
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    heng(i, j);
                    su(i, j);
                }
            }
            let flag = false;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (bomb_map[i][j] == 1) {
                        clear_ball(i, j);
                        score += 1;
                        mapp[i][j] = 0;
                        flag = true;
                    }
                }
            }
            document.getElementById("score").innerHTML = score;
            return flag;
        }
        function draw_box(x, y) {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            let draw_x = x * 100 + 10;
            let draw_y = y * 100 + 10;
            let radius = 20;
            ctx.beginPath();
            ctx.arc(draw_x + 20, draw_y + 20, 20, Math.PI, Math.PI + Math.PI / 2, false);
            ctx.arc(draw_x + 60, draw_y + 20, 20, Math.PI + Math.PI / 2, 0, false);
            ctx.arc(draw_x + 60, draw_y + 60, 20, 0, Math.PI / 2, false);
            ctx.arc(draw_x + 20, draw_y + 60, 20, Math.PI / 2, Math.PI, false);
            ctx.closePath();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        function clear_box(x, y) {
            clear_ball(x, y);
            draw_ball(x, y, mapp[x][y]);
        }
    
        function show_animation(sx, sy, flag) {
            if (flag == 1) {
                clear_ball(sx, sy);
                draw_ball(sx, sy + 0.5, mapp[sx][sy]);
                clear_ball(sx, sy + 0.5);
                draw_ball(sx, sy + 1)
            }
            else if (flag == 2) {
                /*clear_ball(sx,sy);
                clear_ball(sx,sy+1);
                draw_ball(sx,sy+1,mapp[sx][sy]);
                draw_ball(sx,sy,mapp[sx][sy+1]);*/
                let temp = mapp[sx][sy + 1];
                mapp[sx][sy + 1] = mapp[sx][sy];
                mapp[sx][sy] = temp;
                let p = frame_2([sx, sy, 0.1]);
                //.then(frame_2)
                // .then(frame_3)
                // .then(frame_4);
            }
        }
        function frame_1(sx, sy) {
            return new Promise(function (resolve, reject) {
                //console.log("in frame1...");
                clear_ball(sx, sy);
                clear_ball(sx, sy + 1);
                //draw_ball(sx,sy+1,mapp[sx][sy]);
                //draw_ball(sx,sy,mapp[sx][sy+1]);
                let temp = mapp[sx][sy + 1];
                mapp[sx][sy + 1] = mapp[sx][sy];
                mapp[sx][sy] = temp;
                setTimeout(resolve, 100, [sx, sy, 0.1]);
            });
        }
        function frame_2([sx, sy, offset]) {
            return new Promise(function (resolve, reject) {
                //console.log("in frame2...");
                clear_ball(sx, sy + offset - 0.1);
                //draw_ball(sx,sy+offset-0.1,-1);
                draw_ball(sx, sy + offset, mapp[sx][sy + 1]);
                //setTimeout(resolve,100,[sx,sy]);
                if (offset < 0.9) {
                    setTimeout(frame_2, 1, [sx, sy, offset + 0.1]);
                    //frame_2([sx,sy,offset+0.1]);
                }
                else {
                    slide_down_one(sx, sy + 1);
                }
            });
        }
        function frame_3([sx, sy]) {
            return new Promise(function (resolve, reject) {
                //console.log("in frame3...");
                //clear_ball(sx,sy+0.5);
                draw_ball(sx, sy + 0.5, -1);
                //draw_line(sx,sy);
                setTimeout(resolve, 100, [sx, sy]);
            });
        }
        function frame_4([sx, sy]) {
            return new Promise(function (resolve, reject) {
                //console.log("in frame4...");
                //console.log(sx);
                //console.log(sy);
                //clear_ball(sx,sy+0.5);
                draw_ball(sx, sy + 0.5, -1);
                draw_ball(sx, sy, mapp[sx][sy]);
                draw_ball(sx, sy + 1, mapp[sx][sy + 1]);
            });
        }
        function draw_line(sx, sy) {
            let canvas = document.getElementById("canvas");
            let ctx = canvas.getContext('2d');
            ctx.moveTo(sx * 100, sy * 100);
            ctx.lineTo((sx + 1) * 100, sy * 100);
            ctx.lineTo(sx * 100, (sy + 1) * 100);
            ctx.moveTo((sx + 1) * 100, (sy + 1) * 100);
            ctx.lineTo((sx + 1) * 100, sy * 100);
            ctx.lineTo(sx * 100, (sy + 1) * 100);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        function slide_down_one(x, y) {
            if (y > 6) {
                return;
            }
            if (mapp[x][y + 1] == 0) {
                //setTimeout(show_animation,250,x,y,2);
                show_animation(x, y, 2);
                //slide_down_one(x,y+1);
                //setTimeout(slide_down_one,1000+(9-x)*10,x,y+1);
            }
        }
        function slide_down_all() {
            for (let x = 7; x >= 0; x--) {
                for (let y = 7; y >= 0; y--) {
                    if (mapp[x][y] != 0) {
                        //slide_down_one(x,y);
                        setTimeout(slide_down_one, 100 + (9 - x) * 10, x, y);
                    }
                }
            }
        }
        let temp_flag = 0;
        function full_ball() {
            console.log("你别急 ...");
            let flag = false;
            for (let x = 0; x <= 7; x++) {
                if (mapp[x][0] == 0) {
                    flag = true;
                    mapp[x][0] = Math.floor(Math.random() * 5 + 1);
                    draw_ball(x, 0, mapp[x][0]);
                    setTimeout(slide_down_one, (9 - x) * 10, x, 0);
    
                }
            }
            if (flag) {
                setTimeout(full_ball, 500);
            }
    
            // 以下函数可能会导致动画抖动
            if (checkall()) {
                slide_down_all();  //在滑块正在下滑的过程中触发这个函数会导致动画抖动
                if (!flag) {
                    setTimeout(full_ball, 500);
                }
            }
        }

        onMounted(()=>{
            create()
        })

        return { 
            clickfun,
            move
         }
    }
});