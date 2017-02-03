
class DateFormattingService {
    static formatDate(d) {
        if (!isNaN(new Date(d).getTime())) {
          var options = { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'};
          return new Date(d).toLocaleDateString('en-US', options);
        }
        return '';
    }
}

export default DateFormattingService
