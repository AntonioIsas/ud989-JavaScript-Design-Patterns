


/* STUDENT APPLICATION */
$(function() {
    
    function getRandom() {
        return (Math.random() >= 0.5);
    };
            
    var model = {
        studentsList : [
            "Slappy the Frog",
            "Lilly the Lizard",
            "Paulrus the Walrus",
            "Gregory the Goat",
            "Adam the Anaconda",
            "Test", "test1", "test2"
        ],
        
        init: function(){
            
            if (!localStorage.attendance) {
                console.log('Creating attendance records...');
                
                var studentName = model.studentsList,
                    attendance = {};
            
                $.each(studentName, function(key, value) {
                    var name = value;
                    attendance[name] = [];
            
                    for (var i = 0; i <= 11; i++) {
                        attendance[name].push(getRandom());
                    }
                });
                
                localStorage.attendance = JSON.stringify(attendance);
            }
        },
        
        getAttendance: function(){
            return JSON.parse(localStorage.attendance)
        },
        
        setAttendance: function( newAttendance ){
            localStorage.attendance = JSON.stringify(newAttendance);
        }
    };
    
    var view = {
        init: function( attendance ){
            var $list = $('#list');
            
            //Create table with checkboxes
            for( var student in attendance ){
                $list.append(
                    '<tr class="student">'+
                    '<td class="name-col">'+ student +'</td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="attend-col"><input type="checkbox"></td>'+
                    '<td class="missed-col">0</td>'+
                    '</tr>'
                );
            }
            
            // Check boxes, based on attendace records
            $.each(attendance, function(name, days) {
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');
        
                dayChecks.each(function(i) {
                    $(this).prop('checked', days[i]);
                });
            });
            
            // Add click event
            var $allCheckboxes = $('tbody input');
            $allCheckboxes.on('click', function() {
                controller.checkBoxClick();
            });
            
            //Update Count
            this.updateCount();
        },
        
        
        // Count a student's missed days
        updateCount : function() {
            var $allMissed = $('tbody .missed-col');
            
            $allMissed.each(function() {
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;
    
                dayChecks.each(function() {
                    if (!$(this).prop('checked')) {
                        numMissed++;
                    }
                });
    
                $(this).text(numMissed);
            });
        }
    
    };
    
    var controller = {
        init: function(){
            model.init();
            view.init( model.getAttendance() );
        },
        
        checkBoxClick: function(){
            var studentRows = $('tbody .student'),
                newAttendance = {};
    
            studentRows.each(function() {
                var name = $(this).children('.name-col').text(),
                    $allCheckboxes = $(this).children('td').children('input');
    
                newAttendance[name] = [];
    
                $allCheckboxes.each(function() {
                    newAttendance[name].push($(this).prop('checked'));
                });
            });
    
            view.updateCount();
            model.setAttendance(newAttendance);
        }
    };
    
    controller.init();
}());