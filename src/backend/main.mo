import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";

actor {
  module SubmissionId {
    public func compare(nat1 : SubmissionId, nat2 : SubmissionId) : Order.Order {
      Nat.compare(nat1, nat2);
    };
  };

  type SubmissionId = Nat;
  type CryptoPair = Text;
  type ForexPair = Text;

  public type Category = {
    #forex;
    #crypto;
  };

  public type SignalType = {
    #buy;
    #sell;
  };

  public type Signal = {
    id : Nat;
    pair : Text;
    signalType : SignalType;
    entryPrice : Float;
    target : Float;
    stopLoss : Float;
    status : {
      #active;
      #closed;
    };
    timestamp : Int;
    category : Category;
  };

  public type EducationResource = {
    id : Nat;
    title : Text;
    description : Text;
    category : Category;
    difficultyLevel : Text;
    duration : Nat; // in minutes
  };

  var nextContactId = 0;
  var nextSignalId = 0;
  var nextResourceId = 0;

  let contactSubmissions = Map.empty<SubmissionId, ContactSubmission>();
  let signals = Map.empty<Nat, Signal>();
  let educationResources = Map.empty<Nat, EducationResource>();

  type ContactSubmission = {
    id : SubmissionId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(cs1 : ContactSubmission, cs2 : ContactSubmission) : Order.Order {
      Int.compare(cs1.timestamp, cs2.timestamp);
    };
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, subject : Text, message : Text) : async () {
    let id = nextContactId;
    nextContactId += 1;

    let submission : ContactSubmission = {
      id;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    };

    contactSubmissions.add(id, submission);
  };

  public shared ({ caller }) func addSignal(pair : Text, signalType : SignalType, entryPrice : Float, target : Float, stopLoss : Float, category : Category) : async () {
    let id = nextSignalId;
    nextSignalId += 1;

    let signal : Signal = {
      id;
      pair;
      signalType;
      entryPrice;
      target;
      stopLoss;
      status = #active;
      timestamp = Time.now();
      category;
    };

    signals.add(id, signal);
  };

  public shared ({ caller }) func updateSignal(id : Nat, pair : Text, signalType : SignalType, entryPrice : Float, target : Float, stopLoss : Float, status : { #active; #closed }, category : Category) : async () {
    switch (signals.get(id)) {
      case (null) { Runtime.trap("Signal not found!") };
      case (?_) {
        let updatedSignal : Signal = {
          id;
          pair;
          signalType;
          entryPrice;
          target;
          stopLoss;
          status;
          timestamp = Time.now();
          category;
        };
        signals.add(id, updatedSignal);
      };
    };
  };

  public shared ({ caller }) func addEducationResource(title : Text, description : Text, category : Category, difficultyLevel : Text, duration : Nat) : async () {
    let id = nextResourceId;
    nextResourceId += 1;

    let resource : EducationResource = {
      id;
      title;
      description;
      category;
      difficultyLevel;
      duration;
    };

    educationResources.add(id, resource);
  };

  public shared ({ caller }) func updateEducationResource(id : Nat, title : Text, description : Text, category : Category, difficultyLevel : Text, duration : Nat) : async () {
    switch (educationResources.get(id)) {
      case (null) { Runtime.trap("Resource not found!") };
      case (?_) {
        let updatedResource : EducationResource = {
          id;
          title;
          description;
          category;
          difficultyLevel;
          duration;
        };
        educationResources.add(id, updatedResource);
      };
    };
  };

  public query ({ caller }) func getAllSignals() : async [Signal] {
    signals.values().toArray();
  };

  public query ({ caller }) func getSignalsByCategory(category : Category) : async [Signal] {
    signals.values().toArray().filter(
      func(signal) {
        signal.category == category;
      }
    );
  };

  public query ({ caller }) func getAllEducationResources() : async [EducationResource] {
    educationResources.values().toArray();
  };

  public query ({ caller }) func getContactSubmissionsByEmail(email : Text) : async [ContactSubmission] {
    contactSubmissions.values().toArray().filter(
      func(submission) {
        submission.email == email;
      }
    ).sort();
  };
};
