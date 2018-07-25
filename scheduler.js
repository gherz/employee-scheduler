$(document).ready(function() {


    /* initialize the external events
    -----------------------------------------------------------------*/

    $('#external-events .fc-event').each(function() {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
    -----------------------------------------------------------------*/

    $('#calendar').fullCalendar({
        defaultView: 'agendaDay',
        groupByResource: true,
        resources: [
            {
                id: 'markReel',
                title: 'Mark Reel',
                businessHours: {
                    start: '10:00',
                    end: '18:00'
                }
            },
            {
                id: 'tomSmith',
                title: 'Tom Smith',
                businessHours: {
                    start: '9:00',
                    end: '15:00'
                }
            },
            {
                id: 'jerryGray',
                title: 'Jerry Gray',
                businessHours: {
                    start: '8:30',
                    end: '19:30'
                }
            },
            {
                id: 'faithStern',
                title: 'Faith Stern',
                businessHours: {
                    start: '9:00',
                    end: '19:00'
                }
             },
            { id: 'joeHendel',
                title: 'Joe Hendel',
                businessHours: {
                    start: '11:00',
                    end: '20:00'
                }
            },
            {
                id: 'kimMat',
                title: 'Kim Mat',
                businessHours: {
                    start: '9:00',
                    end: '14:00'
                }
            },
            {
                id: 'lauraZillos',
                title: 'Laura Zillos',
                businessHours: {
                    start: '10:00',
                    end: '18:00'
                }
            },
            {
                id: 'manyShaw',
                title: 'Many Shaw',
                businessHours: {
                    start: '8:00',
                    end: '18:00'
                }
            }
        ],
        header: {
            left: '',
            center: 'prev,title,next',
            right: '',
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        dragRevertDuration: 0,
        drop: function() {
                $(this).remove();
        },
        eventDragStop: function( event, jsEvent, ui, view ) {

            if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
                $('#calendar').fullCalendar('removeEvents', event._id);
                var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
                el.draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0
                });
                el.data('event', { title: event.title, id :event.id, stick: true });
            }
        }
    });


    var isEventOverDiv = function(x, y) {

        var external_events = $( '#external-events' );
        var offset = external_events.offset();
        offset.right = external_events.width() + offset.left;
        offset.bottom = external_events.height() + offset.top;

        // Compare
        if (x >= offset.left
            && y >= offset.top
            && x <= offset.right
            && y <= offset .bottom) { return true; }
        return false;

    }


});
