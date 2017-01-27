
class DateFormattingService {
    static formatDate(d) {
        if (!isNaN(new Date(d).getTime())) {
          var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(d).toLocaleDateString('en-US', options);
        }
        return '';
    }
}

export default DateFormattingService
