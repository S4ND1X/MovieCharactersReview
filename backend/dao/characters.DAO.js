let characters;

export default class CharactersDAO {
  static async injectDB(conn) {
    if (characters) {
      return;
    }

    try {
      characters = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("Characters");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in charactersDAO: ${e}`
      );
    }
  }

  static async getCharacters({
    filters = null,
    page = 0,
    charactersPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        //Search by text, this is later defined by us in mongodb
        query = { $text: { $search: filters["name"] } };
      } else if ("gender" in filters) {
        //The gender attribute must be equal to the filters gender property
        query = { gender: { $eq: filters["gender"] } };
      } else if ("house" in filters) {
        //The house attribute must be equal to the filters gender property
        query = { house: { $eq: filters["house"] } };
      }
    }
    
    let cursor;

    try {
      //MongoDB query with query params
      cursor = await characters.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { charactersList: [], totalNumCharacters: 0 };
    }

    //Page of results
    const displayCursor = cursor
      .limit(charactersPerPage)
      .skip(charactersPerPage * page);

    try {
      const charactersList = await displayCursor.toArray();
      const totalNumCharacters = await characters.countDocuments(query);

      return { charactersList, totalNumCharacters };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or porblem counting documents, ${e}`
      );

      return { charactersList: [], totalNumCharacters: 0 };
    }
  }
}
