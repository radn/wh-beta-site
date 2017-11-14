angular.module('myngApp', ['pickadate']).controller('myController', function($scope) {
    function getEventdata() {
        var url = 'http://thewashingtonharbour.com/idamfinder/GetEventListByYear_JSONP.aspx';
        url = url + '?year=' + $scope.selectedYear + '&width=260&height=260';
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'jsonp_event_list_items_by_year',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(result) {
                var
                    theList = [];
                theList = myFilter(result.rows, 'event_date', currentMonth);
                dayClicked();
                loopData(theList, 'value');
                checkTodayEvents();
            },
            error: function(e) {
                console.log('error');
            }
        });

        function myFilter(items, attr, value) {
            var dataList = [];
            for (var item in items) {
                var
                    dt = new Date(items[item].value[attr]),
                    dtMonth = dt.getMonth(),
                    check = checkRecurringEvent(items[item].value.UDFs),
                    activeEvent = checkPullEvent(items[item].value);
                if (!!activeEvent) {
                    if (dtMonth + 1 === value || !!check) {
                        dataList.push(items[item]);
                    }
                }
            }
            return dataList;
        }

        function checkRecurringEvent(items) {
            for (var item in items) {
                if (items[item].name == 'Recurring Event') {
                    if (items[item].value == '1') {
                        return true;
                    }
                }
            }
            return false;
        }

        function checkPullEvent(item) {
            var
                whatDay = $('.pickadate-today').text(),
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                whatDate = months[$scope.getMonth - 1] + ' 1 ',
                whichYear = ($scope.getYear - 100) + 2000,
                whatDate = whatDate + ' ' + whichYear,
                pullDate = new Date(item.pull_date).getTime(),
                actveDate = new Date(whatDate).getTime();
            if (actveDate < pullDate) {
                return true;
            }
            return false;
        }

        function checkTodayEvents() {
            if ($('.pickadate-enabled').hasClass('pickadate-today')) {
                $('ul.box li').each(function() {
                    var
                        ourActiveDay = $('.pickadate-today').text(),
                        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        getTheMonth = months[$scope.getMonth - 1],
                        whatDateActive = getTheMonth + ' ' + ourActiveDay + ' ' + $scope.selectedYear,
                        whatDayActive = new Date(whatDateActive).getDay(),
                        dayActiveTime = new Date(whatDateActive).getTime(),
                        weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
                        activeDayName = weekdays[whatDayActive],
                        activeList = [],
                        eventRuns = $(this).attr('data-day'),
                        eventRunsDay = new Date(eventRuns).getDay(),
                        pullOurData = $(this).attr('data-pull'),
                        pullTime = new Date(pullOurData).getTime();
                    if (dayActiveTime > pullTime) {
                        activeList.push(whatDayActive);
                        $(this).addClass('inactive');
                    }
                });
            } else {
                $(this).removeClass('inactive');
                emptyMsgShow();
            }

            function emptyMsgShow() {
                $('ul.box li').each(function() {
                    if ($(this).hasClass('inactive')) {
                        $('.empty-msg').slideDown(10);
                    } else {
                        $('.empty-msg').slideUp(10);
                    }
                });
            }
        }

        function checkWeekday(items) {
            for (var item in items) {
                var getDayVal = items[item].value;
                var getDayName = items[item].name;
                if (getDayName == '1. Monday') {
                    if (getVal.length > 0) {
                        return getDayName;
                    }
                }
            }
            return false;
        }

        function loopData(items, attr) {
            $.each(items, function() {
                $('.box').append(buildEvent(this[attr]));
                prevRep();
            });
        }

        function buildEvent(obj) {
            var
                tmp = '',
                days = [],
                day = '',
                weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            for (var item in obj.UDFs) {
                if (obj.UDFs[item].value != '') {
                    day = obj.UDFs[item].name.replace(/[0-9]/g, '').replace('.', '').trim().toLowerCase();
                    if ($.inArray(day, weekdays) >= 0) {
                        days.push(day);
                    }
                }
            }
            tmp = '<li data-day="' + days.join('-') + '"' + 'data-pull="' + obj.pull_date + '"' + 'data-startdate="' + obj.event_date + '"' + 'data-eventdate="' + obj.event_date + '"' + 'data-active="">';
            tmp += '<div class="img-container">';
            if (!!obj.Assets) {
                if (!!obj.Assets[0].ViewURL) {
                    tmp += '<div class="obj-tag"><object width="260" height="260" data="' + obj.Assets[0].ViewURL + '"><img scr="' + obj.Assets[0].ViewURL + '"></object></div>';
                }
            } else {
                tmp += '<img src="/assets/img/events/images/event_default.jpg">';
            }
            tmp += '</div>';
            tmp += '<div class="details"><h2>' + obj.headline + '</h2>';
            $.each(obj.UDFs, function() {
                if (this.name.toLowerCase() === 'event note') {
                    tmp += '<b><p><em>' + this.value + '</em></p></b>';
                }
            });
            $.each(obj.UDFs, function() {
                if (this.name.toLowerCase() === 'event time') {
                    tmp += '<b><p>' + this.value + '</p></b>';
                }
            });
            tmp += '<p><span>' + obj.content + '</span></p>';
            $.each(obj.UDFs, function() {
                if (this.name.toLowerCase() === 'event url') {
                    if (this.value.length > 4) {
                        tmp += '<p><a href="http://' + this.value + '" target="_blank">' + this.value + '</a></p>';
                    }
                }
            });
            tmp += '</div>';
            tmp += '</li>';
            return tmp;
        }
    }

    function clearEventdata() {
        $('.box').empty();
    }
    var currentMonth, currentYear;
    $scope.date = new Date();
    $scope.getMonth = $scope.date.getMonth() + 1;
    $scope.getYear = $scope.date.getYear();
    $scope.selectedYear = ($scope.getYear - 100) + 2000;
    currentMonth = $scope.getMonth;
    currentYear = $scope.selectedYear;

    function changeMonth() {
        $('.pickadate-next').click(function() {
            if ($scope.getMonth < 12) {
                $scope.getMonth = $scope.getMonth + 1;
                $scope.selectedYear = $scope.selectedYear;
            } else {
                $scope.getMonth = ($scope.getMonth - 12) + 1;
                $scope.selectedYear = $scope.selectedYear + 1;
            }
            getEvents();
            clearEventdata();
            getEventdata();
        });
        $('.pickadate-prev').click(function() {
            if ($scope.getMonth < 12 && $scope.getMonth > 1) {
                $scope.getMonth = $scope.getMonth - 1;
                $scope.selectedYear = $scope.selectedYear;
            } else if ($scope.getMonth === 1) {
                $scope.getMonth = ($scope.getMonth + 12) - 1;
                $scope.selectedYear = $scope.selectedYear - 1;
            } else {
                $scope.getMonth = ($scope.getMonth) - 1;
                $scope.selectedYear = $scope.selectedYear;
            }
            getEvents();
            clearEventdata();
            getEventdata();
        });
    }

    function removeExpired() {
        var
            self, eventDay, activeList, expiryDate, eventDate, expiryDateTime, selectedDateTime, eventDateTime, months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            getTheMonth = months[$scope.getMonth - 1],
            selectDay = $('.pickadate-active').text(),
            selectDate = getTheMonth + ' ' + selectDay + ' ' + $scope.selectedYear,
            weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
            dayName = '',
            fndDay = (new Date(selectDate)).getDay(),
            dayName = weekdays[fndDay],
            activeList = [],
            testArray = [],
            daysList = [],
            tOne = $(this).attr('data-startdate'),
            tTwo = new Date(tTwo).getTime();
        tOne = new Date(tOne).getTime();
        $('ul.box li').each(function() {
            self = $(this);
            eventDay = self.attr('data-day');
            expiryDate = self.attr('data-pull');
            eventDate = self.attr('data-eventdate');
            selectedDateTime = new Date(selectDate).getTime();
            expiryDateTime = new Date(expiryDate).getTime();
            eventDateTime = new Date(eventDate).getTime();
            if ((eventDay === dayName) && (expiryDateTime > selectedDateTime)) {
                self.removeClass('inactive');
                activeList.push(dayName);
                testArray.push(eventDay);
            } else {
                self.addClass('inactive');
            }
        });
        if (activeList.length === 0) {
            $('.empty-msg').slideDown(10);
        } else {
            $('.empty-msg').slideUp(10);
        }
    }

    function emptyMsgShow() {}

    function prevRep() {
        var liText = '',
            liList = $('.box li .details h2'),
            listForRemove = [];
        $(liList).each(function() {
            var text = $(this).text();
            if (liText.indexOf('|' + text + '|') == -1)
                liText += '|' + text + '|';
            else
                listForRemove.push($(this));
        });
        $(listForRemove).each(function() {
            $(this).closest('li').addClass('repeated-re');
        });
    }

    function dayClicked() {
        $('.pickadate-cell li').click(function() {
            var
                months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                getTheMonth = months[$scope.getMonth - 1],
                selectDay = $('.pickadate-active').text(),
                selectDate = getTheMonth + ' ' + selectDay + ' ' + $scope.selectedYear,
                weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
                dayName = '',
                fndDay = (new Date(selectDate)).getDay(),
                dayName = weekdays[fndDay];
            $('.box li').each(function() {
                $(this).removeClass('repeated-re');
                var evetCalDay = $(this).attr('data-day');
                var theAttr = $(this).attr('style');
                var tOne = $(this).attr('data-startdate');
                var tTwo = selectDate;
                ttOne = new Date(tOne).getMonth();
                ttTwo = new Date(tTwo).getMonth();
                t1 = new Date(tOne).getDate();
                t2 = new Date(tTwo).getDate();
                mySelectedDay = new Date(selectDate).getTime();
                if ((ttOne > ttTwo)) {
                    $(this).addClass('inactive-events');
                } else if ((ttOne == ttTwo) && (t1 > t2 + 1)) {
                    $(this).addClass('inactive-events');
                } else {
                    $(this).removeClass('inactive-events');
                }
                if (typeof theAttr !== 'undefined') {
                    $(this).addClass('repeated');
                    $('.repeated').css('display', 'block');
                    if (!!!(dayName == evetCalDay)) {
                        $('.repeated').css('display', 'none');
                    }
                }
            });
            removeExpired();
            activeCount();
        });
    }

    function activeCount() {
        var activeEvents = $('.box').children('li:visible').length
        if (activeEvents < 1) {
            $('.box-second').css('display', 'block');
        } else {
            $('.box-second').css('display', 'none');
        }
    }

    function getEvents() {
        $('ul.pickadate-cell:last-child').slideUp(0);
        var
            theMonth = $scope.getMonth,
            theYear = $scope.getYear,
            theYear = (theYear - 100) + 2000,
            url = 'http://thewashingtonharbour.com/idamfinder/GetEventList_JSONP.aspx',
            url = url + '?year=' + theYear + '&month=' + theMonth + '&width=260&height=260';
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'jsonp_event_list_items',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(myresult) {
                var dates = [];
                var thisMonth = [];
                var list = myresult.rows;
                for (item in list) {
                    if (!!list[item].value) {
                        var
                            mydays = list[item].value.event_date;
                        if ($.inArray(mydays, dates) < 0) {
                            dates.push(mydays);
                        }
                    }
                }
                for (var i = 0; i < dates.length; i++) {
                    var tmp = new Date(dates[i]);
                    var tmp2 = tmp.getDate();
                    var tmp3 = tmp.getMonth() + 1;
                    if (tmp3 == theMonth) {
                        day = tmp.getDate();
                        if ($.inArray(day, thisMonth) < 0) {
                            thisMonth.push(tmp2);
                        }
                    }
                }
                $('.pickadate-cell li.pickadate-enabled').each(function() {
                    var
                        aCalendarDay = $(this).text(),
                        aCalendarDay = parseInt(aCalendarDay);
                    if ($.inArray(aCalendarDay, thisMonth) > -1) {
                        $(this).addClass('highlighted');
                        $('ul.pickadate-cell:last-child').slideDown(0);
                    } else {
                        $(this).removeClass('highlighted');
                        $('ul.pickadate-cell:last-child').slideDown(0);
                    }
                });
            },
            error: function(e) {
                console.log('error');
            }
        });
    }
    getEvents();
    clearEventdata();
    getEventdata();
    changeMonth();
});