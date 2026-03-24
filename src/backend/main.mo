import OutCall "http-outcalls/outcall";

actor {
  let baseUrl = "https://api.jikan.moe/v4";

  stable var visitorCount : Nat = 0;

  public func recordVisit() : async () {
    visitorCount += 1;
  };

  public query func getVisitCount() : async Nat {
    visitorCount;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func getTopAnime() : async Text {
    let url = baseUrl # "/top/anime?limit=24";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func searchAnime(searchTerm : Text, genre : Text, status : Text, minScore : Text) : async Text {
    let url = baseUrl # "/anime?q=" # searchTerm # "&genres=" # genre # "&status=" # status # "&min_score=" # minScore # "&limit=24";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func getAnimeDetail(animeId : Nat) : async Text {
    let url = baseUrl # "/anime/" # animeId.toText() # "/full";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func getAnimeRecommendations(animeId : Nat) : async Text {
    let url = baseUrl # "/anime/" # animeId.toText() # "/recommendations";
    await OutCall.httpGetRequest(url, [], transform);
  };

  public shared ({ caller }) func getGenres() : async Text {
    let url = baseUrl # "/genres/anime";
    await OutCall.httpGetRequest(url, [], transform);
  };
};
