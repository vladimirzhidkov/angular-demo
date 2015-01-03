angular.module('app.directives.slickGrid', [])
    .directive('slickGrid',[function(){
        return {
            restrict: 'A',
            scope: {
                data:'='
            },
            link: function(scope, element, attrs){
                var grid;
                var dataView = new Slick.Data.DataView();
                var data = scope.data;
                var percentCompleteThreshold = 0;
                var sortCol = "title";

//                function comparator(a, b) {
//                    var x = a[sortCol], y = b[sortCol];
//                    return (x == y ? 0 : (x > y ? 1 : -1));
//                }

//                function myFilter(item, args) {
//                  return item["percentComplete"] >= args.percentComplete;
//                }

                function groupByDuration() {
                    dataView.setGrouping({
                        getter: "duration",
                        formatter: function (g) {
                            return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
                        },
                        aggregators: [
                            new Slick.Data.Aggregators.Avg("percentComplete"),
                            new Slick.Data.Aggregators.Sum("cost")
                        ],
                        aggregateCollapsed: false,
                        lazyTotalsCalculation: true
                    });
                }

                // Columns for slick grid
                function sumTotalsFormatter(totals, columnDef) {
                    var val = totals.sum && totals.sum[columnDef.field];
                    if (val != null) {
                        return "total: " + ((Math.round(parseFloat(val)*100)/100));
                    }
                    return "";
                }
                function avgTotalsFormatter(totals, columnDef) {
                    var val = totals.avg && totals.avg[columnDef.field];
                    if (val != null) {
                        return "avg: " + Math.round(val) + "%";
                    }
                    return "";
                }
                var columns = [
                  {id: "sel", name: "#", field: "num", cssClass: "cell-selection", width: 40, resizable: false, selectable: false, focusable: false },
                  {id: "title", name: "Title", field: "title", width: 90, minWidth: 50, cssClass: "cell-title", sortable: true, editor: Slick.Editors.Text},
                  {id: "duration", name: "Duration", field: "duration", width: 100, sortable: true, groupTotalsFormatter: sumTotalsFormatter},
                  {id: "%", name: "% Complete", field: "percentComplete", width: 120, formatter: Slick.Formatters.PercentCompleteBar, sortable: true, groupTotalsFormatter: avgTotalsFormatter},
                  {id: "start", name: "Start", field: "start", minWidth: 120, sortable: true},
                  {id: "finish", name: "Finish", field: "finish", minWidth: 120, sortable: true},
                  {id: "cost", name: "Cost", field: "cost", width: 90, sortable: true, groupTotalsFormatter: sumTotalsFormatter},
                  {id: "effort-driven", name: "Effort Driven", width: 140, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark, sortable: true}
                ];

                // Options for slick grid
                var options = {
                    enableCellNavigation: true,
                    editable: false
                };

                // Set dataView
//                var groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
//                dataView = new Slick.Data.DataView({
//                        groupItemMetadataProvider: groupItemMetadataProvider,
//                        inlineFilters: true
//                    });
                grid = new Slick.Grid(element, dataView, columns, options);

//  // register the group item metadata provider to add expand/collapse group handlers
//  grid.registerPlugin(groupItemMetadataProvider);
//  grid.setSelectionModel(new Slick.CellSelectionModel());
//  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
//  var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
//  grid.onSort.subscribe(function (e, args) {
//    sortdir = args.sortAsc ? 1 : -1;
//    sortcol = args.sortCol.field;
//    if ($.browser.msie && $.browser.version <= 8) {
//      // using temporary Object.prototype.toString override
//      // more limited and does lexicographic sort only by default, but can be much faster
//      var percentCompleteValueFn = function () {
//        var val = this["percentComplete"];
//        if (val < 10) {
//          return "00" + val;
//        } else if (val < 100) {
//          return "0" + val;
//        } else {
//          return val;
//        }
//      };
//      // use numeric sort of % and lexicographic for everything else
//      dataView.fastSort((sortCol == "percentComplete") ? percentCompleteValueFn : sortCol, args.sortAsc);
//    }
//    else {
//      // using native sort with comparer
//      // preferred method but can be very slow in IE with huge datasets
//      dataView.sort(comparator, args.sortAsc);
//    }
//  });

                // wire up model events to drive the grid
                dataView.onRowCountChanged.subscribe(function (e, args) {
                    grid.updateRowCount();
                    grid.render();
                });
                dataView.onRowsChanged.subscribe(function (e, args) {
                    grid.invalidateRows(args.rows);
                    grid.render();
                });


                // initialize the model after all the events have been hooked up
                dataView.beginUpdate();
//                dataView.setFilter(myFilter);
//                dataView.setFilterArgs({
//                    percentComplete: percentCompleteThreshold
//                });

                dataView.setItems(data);

                // Set grouping by duration
                dataView.setGrouping({
                    getter: "duration",
                    formatter: function (g) { return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";},
                    aggregators: [ new Slick.Data.Aggregators.Avg("percentComplete"), new Slick.Data.Aggregators.Sum("cost")],
                    aggregateCollapsed: false,
                    lazyTotalsCalculation: true
                });
                dataView.endUpdate();

            }
        };
    }])