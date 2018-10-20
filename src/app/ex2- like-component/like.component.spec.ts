import { LikeComponent } from './like.component';

describe('LikeComponent', () => {
    let likeComponent: LikeComponent;
    let likes: number;

    beforeEach(() => {
        likeComponent = new LikeComponent();
        likes = likeComponent.totalLikes;
    });

    it('should toggle the iLike property when I click it', () => {
        likeComponent.click();

        expect(likeComponent.totalLikes).toBeTruthy();
    });

    it('should decrement total likes if I like an object and click the LikeComponent to unlike it', () => {
        likeComponent.iLike = true;

        likeComponent.click();

        expect(likeComponent.totalLikes).toBeLessThan(likes);
    });

    it('should increment total likes if I do NOT like an object and click the LikeComponent to like it', () => {
        likeComponent.iLike = false;

        likeComponent.click();

        expect(likeComponent.totalLikes).toBeGreaterThan(likes);
    });
});
