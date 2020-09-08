"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _defineProperty(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var game,timerInterval,MineSweeper=function(){function i(e,t){var a=this;_classCallCheck(this,i),_defineProperty(this,"board",ctx),_defineProperty(this,"grid",void 0),_defineProperty(this,"flags",0),_defineProperty(this,"winner",!1),_defineProperty(this,"loser",!1),_defineProperty(this,"squares",[]),_defineProperty(this,"isRunning",!1),_defineProperty(this,"allVisited",!1),_defineProperty(this,"emptySquares",0),_defineProperty(this,"visitedSquares",0),_defineProperty(this,"updateMineCounter",function(){document.getElementById("mine-counter").innerHTML=game.remainingMines}),_defineProperty(this,"startTimer",function(){a.isRunning=!0;var e=1,t=document.getElementById("seconds");timerInterval=setInterval(function(){t.innerHTML=e++},1e3)}),_defineProperty(this,"hasVisitedAll",function(){setTimeout(function(){a.emptySquares===a.visitedSquares&&a.setWinner()},20)}),_defineProperty(this,"drawGrid",function(){return a.mines>a.rowCol*a.rowCol?"Erro!":(a.grid=a.build2DArray(a.rowCol),a.fillCols(a.rowCol),a.placeMines(a.grid,a.mines),a.grid)}),_defineProperty(this,"build2DArray",function(e){for(var t=new Array(e),i=0;i<e;i++)t[i]=new Array(e);return t}),_defineProperty(this,"fillCols",function(e){for(var t=0;t<e;t++)for(var i=0;i<a.rowCol;i++)a.grid[t][i]=""}),_defineProperty(this,"placeMines",function(e,t){for(var i=0;i<t;){Math.floor(Math.random()*e.length);var r=Math.floor(Math.random()*e.length),n=Math.floor(Math.random()*e.length);"M"!==e[r][n]&&(e[r][n]="M",i++)}return e}),_defineProperty(this,"drawSquares",function(){for(var e=0;e<a.grid.length;e++)for(var t=0;t<a.grid[e].length;t++){var i=e*size,r=t*size,n=new Square(a.board,e,t,r,i,size);n.draw(),a.squares.push(n)}return a.bindSquaresAndMines(),board}),_defineProperty(this,"bindSquaresAndMines",function(){for(var e=0;e<a.grid.length;e++)for(var t=0;t<a.grid[e].length;t++){"M"===a.grid[e][t]&&(a.getSquareByIndex(e,t).hasMine=!0)}}),_defineProperty(this,"getClickPosition",function(e){var t=canvas.getBoundingClientRect();return[e.clientX-Math.floor(t.left),e.clientY-Math.floor(t.top)]}),_defineProperty(this,"getSquareByIndex",function(e,t){for(var i,r=0;r<a.squares.length;r++)if(a.squares[r].row===e&&a.squares[r].col===t){i=a.squares[r];break}return i}),_defineProperty(this,"getSquareByClick",function(e){for(var t,i=e[0],r=e[1],n=0;n<a.squares.length;n++)a.squares[n].row===Math.floor(r/size)&&a.squares[n].col===Math.floor(i/size)&&(t=a.squares[n]);return t}),_defineProperty(this,"setLoser",function(){clearInterval(timerInterval),a.loser=!0,a.revealMines(),setTimeout(function(){alert("Game Over!")},50)}),_defineProperty(this,"revealMines",function(){a.squares.map(function(e){e.hasMine&&!e.flagged&&e.paint(),!e.hasMine&&e.flagged&&e.cancelFlag()})}),_defineProperty(this,"squareClicked",function(e){var t,i;a.loser||a.winner||(t=a.getClickPosition(e),(i=a.getSquareByClick(t)).hasMine&&a.setLoser(),i.paint(),i.hasMine||i.hasAdjacentMines()||a.expand(i),i.setVisited(),a.hasVisitedAll())}),_defineProperty(this,"expand",function(e){var t;e.paint(),e.hasAdjacentMines()||e.visited||(e.setVisited(),t=e.getAdjacentSquares(),Object.values(t).map(function(e){e.isEmpty||a.expand(e)})),e.hasAdjacentMines()&&!e.visited&&e.setVisited()}),_defineProperty(this,"squareFlagged",function(e){var t,i;a.loser||a.winner||(t=a.getClickPosition(e),(i=a.getSquareByClick(t)).flagged?i.unflag():i.flag())}),_defineProperty(this,"showFinalBoard",function(){a.squares.map(function(e){e.flagged?e.flag():e.paint()})}),_defineProperty(this,"setWinner",function(){clearInterval(timerInterval),a.winner=!0,alert("You won!");for(var e=0;e<=5e3;)setTimeout(a.victoryParty.bind(null,e,size),500),e++}),_defineProperty(this,"victoryParty",function(e,t){var i=Math.floor(Math.random()*canvas.height),r=Math.floor(Math.random()*canvas.height),n=a.getSquareByClick([i,r]);a.board.fillStyle=a.randomColor(),a.board.fillRect(n.x,n.y,t,t),a.board.strokeRect(n.x,n.y,t,t),5e3===e&&game.showFinalBoard()}),_defineProperty(this,"randomColor",function(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}),this.rowCol=e,this.mines=t,this.remainingMines=t}return _createClass(i,[{key:"init",value:function(){this.drawGrid(),this.drawSquares(),this.updateMineCounter(),this.emptySquares=this.squares.length-this.mines}}]),i}(),Square=function e(t,i,r,n,a,s,o){var d=this;_classCallCheck(this,e),_defineProperty(this,"visited",!1),_defineProperty(this,"flagged",!1),_defineProperty(this,"getVisited",function(){return d.visited}),_defineProperty(this,"setVisited",function(){d.visited||game.visitedSquares++,d.visited=!0}),_defineProperty(this,"paint",function(){if(d.hasMine)return d.board.fillStyle="red",d.board.fillRect(d.x,d.y,d.size,d.size),void d.board.strokeRect(d.x,d.y,d.size,d.size);d.board.fillStyle="#c1c1c1",d.board.fillRect(d.x,d.y,d.size,d.size),d.board.strokeRect(d.x,d.y,d.size,d.size);var e=d.hasAdjacentMines();0<e&&(d.board.fillStyle="red",d.board.textAlign="center",d.board.textBaseline="middle",d.board.font="".concat(d.size-10,"px Open Sans"),d.board.fillText("".concat(e),d.x+d.size/2,d.y+d.size/2))}),_defineProperty(this,"flag",function(){d.visited||(d.flagged=!0,d.hasMine&&game.flags++,game.remainingMines--,d.board.fillStyle="blue",d.board.fillRect(d.x,d.y,d.size,d.size),d.board.strokeRect(d.x,d.y,d.size,d.size))}),_defineProperty(this,"unflag",function(){d.flagged=!1,game.remainingMines++,d.board.fillStyle="#575757",d.board.fillRect(d.x,d.y,d.size,d.size),d.board.strokeRect(d.x,d.y,d.size,d.size)}),_defineProperty(this,"cancelFlag",function(){d.board.fillStyle="orange",d.board.fillRect(d.x,d.y,d.size,d.size),d.board.strokeRect(d.x,d.y,d.size,d.size)}),_defineProperty(this,"hasAdjacentMines",function(){var e=0,t=d.getAdjacentSquares();return!t.right.isEmpty&&t.right.hasMine&&e++,!t.left.isEmpty&&t.left.hasMine&&e++,!t.leftDiagDown.isEmpty&&t.leftDiagDown.hasMine&&e++,!t.leftDiagUp.isEmpty&&t.leftDiagUp.hasMine&&e++,!t.rightDiagDown.isEmpty&&t.rightDiagDown.hasMine&&e++,!t.rightDiagUp.isEmpty&&t.rightDiagUp.hasMine&&e++,!t.up.isEmpty&&t.up.hasMine&&e++,!t.down.isEmpty&&t.down.hasMine&&e++,e}),_defineProperty(this,"draw",function(){return d.board.fillRect(d.x,d.y,d.size,d.size),d.board.strokeRect(d.x,d.y,d.size,d.size),d.board}),_defineProperty(this,"getAdjacentSquares",function(){var e=game.getSquareByIndex(d.row,d.col+1),t=game.getSquareByIndex(d.row,d.col-1),i=game.getSquareByIndex(d.row-1,d.col+1),r=game.getSquareByIndex(d.row-1,d.col-1),n=game.getSquareByIndex(d.row-1,d.col),a=game.getSquareByIndex(d.row+1,d.col),s=game.getSquareByIndex(d.row+1,d.col+1),o=game.getSquareByIndex(d.row+1,d.col-1);return{right:e||{isEmpty:!0},left:t||{isEmpty:!0},rightDiagUp:i||{isEmpty:!0},rightDiagDown:s||{isEmpty:!0},leftDiagUp:r||{isEmpty:!0},leftDiagDown:o||{isEmpty:!0},up:n||{isEmpty:!0},down:a||{isEmpty:!0}}}),this.board=t,this.row=i,this.col=r,this.x=n,this.y=a,this.size=s,this.hasMine=o},canvas=document.getElementById("board"),size=0,ctx=canvas.getContext("2d");window.innerWidth<790?(ctx.canvas.width=window.innerWidth,ctx.canvas.height=ctx.canvas.width):(ctx.canvas.width=500,ctx.canvas.height=500);var canvasSize=ctx.canvas.width,setUpMines=function(e){switch(e){case"easy":return 10;case"medium":return 40;case"hard":return 99}},setUpRowCol=function(e){switch(e){case"easy":return 9;case"medium":return 16;case"hard":return 22}},setup=function(e,t){e.preventDefault(),clearCounters();var i=setUpMines(t),r=setUpRowCol(t);size=canvasSize/r,(game=new MineSweeper(r,i)).board.fillStyle="#575757",game.init()},clearCounters=function(){clearInterval(timerInterval),document.getElementById("mine-counter").innerHTML=0,document.getElementById("seconds").innerHTML=0},clicked=function(e){game.isRunning||game.startTimer(),game.squareClicked(e)},rightClicked=function(e){return e.preventDefault(),game.isRunning||game.startTimer(),game.squareFlagged(e),game.updateMineCounter(),!1};