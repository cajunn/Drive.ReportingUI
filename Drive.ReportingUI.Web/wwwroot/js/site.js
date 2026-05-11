            //0 <th>Id</th>
            //1 <th>Event Date</th>
            //2 <th>Entity Type</th>
            //3 <th>Event Type</th>
            //4 <th>Actor Id</th>
            //5 <th>Entity Data </th>



$(function () {
    const table = $('#businessEventsTable'); 

    if (table.length) {
        table.DataTable({
            pageLength: 25, 
            order: [[1, 'desc']], 

            columnControl: [
                {
                    target: 0,
                    content: ['order']
                },
                {
                    target: 2,
                    content: ['order', ['searchList']]
                }, 
                {
                    target: 3,
                    content: ['order', ['searchList']]
                }
            ]
            //layout: {
            //    top1: {
            //        searchPanes: {
            //            cascadePanes: true, 
            //            viewTotal: true
            //        }
            //    }
            //},
            //columnDefs: [
            //    {
            //        searchPanes: {
            //            show: true
            //        }, 
            //        targets: [2, 3]
            //    },
            //    {
            //        searchPanes: {
            //            show: false
            //        },
            //        targets: '_all'
            //    }
            //]
        });
    }
});