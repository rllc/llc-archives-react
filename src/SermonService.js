
class SermonService {

    static filter(sermons, searchTerm, selectedCongregation) {
      var filteredSermons = sermons.filter((sermon) => (sermon.published === true))

      if (searchTerm && selectedCongregation) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (
            (sermon.bucketID === selectedCongregation.bucketID) &&
            (
              (sermon.comments.search(searchTerm) !== -1) ||
              (sermon.minister.search(searchTerm) !== -1) ||
              (sermon.bibleText.search(searchTerm) !== -1)
            )
          )
        ))
      }
      // searching all sermons
      else if (searchTerm) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (
            (sermon.comments.search(searchTerm) !== -1) ||
            (sermon.minister.search(searchTerm) !== -1) ||
            (sermon.bibleText.search(searchTerm) !== -1)
          )
        ))
      }
      else if (selectedCongregation) {
        filteredSermons = filteredSermons.filter((sermon) => (
          (sermon.bucketID === selectedCongregation.bucketID)
        ))
      }

      // always sort by date in decsending order
      return filteredSermons.sort((a, b) => (
          new Date(b.date) - new Date(a.date)
      ));
    }

}

export default SermonService
