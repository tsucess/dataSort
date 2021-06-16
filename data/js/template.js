

    function cellTemplate(rowNum, cellNum){
        var isCellEven = true;
        var isRowEven = true;
        if(cellNum % 2 == 1) isCellEven = false;
        if(rowNum % 2 == 1) isRowEven = false;
        if(isCellEven != isRowEven){
            return `<div id="cell-${rowNum}-${cellNum}" class="cell board-cell left"></div>`
        }else{
            return `<div id="cell-${rowNum}-${cellNum}" class="cell board-cell right"></div>`
        }   
    }
    
    function rowTemplate(rowNum){
        var rowString = '';
        rowString += `<div id="row-${rowNum}" class="row">`;
        for (let cellNum = 0; cellNum <= 9; cellNum++) {
            rowString += cellTemplate(rowNum, cellNum);
        }
        rowString += `</div>`;
        return rowString;
    }
    function boardTemplate(){
        var boardString = '';
        for (let rowNum = 0; rowNum <= 9; rowNum++) {
            boardString += rowTemplate(rowNum);
        }
        return boardString;
    }
    
    function seedCellTemplate(cellNum){
        return `<div id="cell-11-${cellNum}" class="cell seeds"></div>`
    }
    
    function seedRowTemplate(){
        var rowString = '';
        for (let cellNum = 0; cellNum <= 9; cellNum++) {
            rowString += seedCellTemplate(cellNum);
        }
        return rowString;
    }
    
    
    $('#board-container').html(boardTemplate());
    $('#row-11').html(seedRowTemplate());




   