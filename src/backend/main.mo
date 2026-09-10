import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";

actor {
  type Question = {
    category : Text;
    questionText : Text;
    optionVata : Text;
    optionPitta : Text;
    optionKapha : Text;
  };

  type QuizResult = {
    dominantDosha : Text;
    vataPercentage : Float;
    pittaPercentage : Float;
    kaphaPercentage : Float;
  };

  let questions = List.empty<Question>();

  public shared ({ caller }) func addQuestion(category : Text, questionText : Text, optionVata : Text, optionPitta : Text, optionKapha : Text) : async () {
    let question : Question = {
      category;
      questionText;
      optionVata;
      optionPitta;
      optionKapha;
    };
    questions.add(question);
  };

  public query ({ caller }) func getQuestions() : async [Question] {
    questions.toArray();
  };

  public query ({ caller }) func calculatePrakruti(answers : [Nat]) : async QuizResult {
    let questionsArray = questions.toArray();
    let numQuestions = questionsArray.size();

    if (answers.size() != numQuestions) {
      Runtime.trap("Number of answers does not match number of questions");
    };

    var vata = 0;
    var pitta = 0;
    var kapha = 0;

    for (i in answers.keys()) {
      switch (answers[i]) {
        case (0) { vata += 1 };
        case (1) { pitta += 1 };
        case (_) { kapha += 1 };
      };
    };

    let floatNumQuestions = numQuestions.toFloat();
    let vataPct = vata.toFloat() / floatNumQuestions * 100.0;
    let pittaPct = pitta.toFloat() / floatNumQuestions * 100.0;
    let kaphaPct = kapha.toFloat() / floatNumQuestions * 100.0;

    let dominantDosha = switch (vata, pitta, kapha) {
      case (vata, pitta, kapha) {
        if (vata > pitta and vata > kapha) { "Vata" } else if (pitta > vata and pitta > kapha) { "Pitta" } else if (kapha > vata and kapha > pitta) {
          "Kapha";
        } else if (vata == pitta and vata > kapha) {
          "Vata-Pitta";
        } else if (vata == kapha and vata > pitta) { "Vata-Kapha" } else { "Pitta-Kapha" };
      };
    };

    {
      dominantDosha;
      vataPercentage = vataPct;
      pittaPercentage = pittaPct;
      kaphaPercentage = kaphaPct;
    };
  };
};
