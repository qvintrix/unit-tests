import {VoterComponent} from './voter.component';

describe('VoterComponent', () => {
  let voterComponent: VoterComponent;

  beforeEach(() => {
    voterComponent = new VoterComponent();
  });

  it('should calculate total votes properly', () => {
    const othersVotes = 1;
    const myVotes = 1;
    voterComponent.othersVote = othersVotes;
    voterComponent.myVote = myVotes;

    const totalVotes = voterComponent.totalVotes;

    expect(totalVotes).toBe(othersVotes + myVotes);
  });

  // Note that the 4 tests for upvotting are grouped under a separate suite.
  // This makes it easier to see the report of our tests: "When upvote, it should ..."

  describe('When upvote,', () => {
    it('should increment total votes', () => {
      voterComponent.upVote();

      expect(voterComponent.totalVotes).toBeGreaterThan(0);
    });

    it('should NOT increment total votes if I have already submitted a positive vote', () => {
      voterComponent.myVote = 1;
      const totalVotes = voterComponent.totalVotes;

      voterComponent.upVote();

      expect(voterComponent.totalVotes).toBe(totalVotes);
    });

    it('should raise an event', () => {
      let myVote = null;
      voterComponent.myVoteChanged.subscribe(voteObj => myVote = voteObj.myVote);

      voterComponent.upVote();

      expect(myVote).toBe(1);
    });

    it('should NOT raise an event if I have already submitted a positive vote', () => {
      let myVote = null;
      voterComponent.myVote = 1;
      voterComponent.myVoteChanged.subscribe(voteObj => myVote = voteObj.myVote);

      voterComponent.upVote();

      expect(myVote).toBeNull();
    });
  });

  describe('When I downvote,', () => {
    it('should decrement total votes', () => {
      voterComponent.downVote();

      expect(voterComponent.totalVotes).toBeLessThan(0);
    });

    it('should NOT decrement total votes if I have already submitted a negative vote', () => {
      voterComponent.myVote = -1;
      const totalVotes = voterComponent.totalVotes;

      voterComponent.downVote();

      expect(voterComponent.totalVotes).toBe(totalVotes);
    });

    it('should raise an event', () => {
      let myVote = null;
      voterComponent.myVoteChanged.subscribe(voteObj => myVote = voteObj.myVote);

      voterComponent.downVote();

      expect(myVote).toBe(-1);
    });

    it('should NOT raise an event if I have already submitted a negative vote', () => {
      let myVote = null;
      voterComponent.myVote = -1;
      voterComponent.myVoteChanged.subscribe(voteObj => myVote = voteObj.myVote);

      voterComponent.downVote();

      expect(myVote).toBeNull();
    });
  });
});
