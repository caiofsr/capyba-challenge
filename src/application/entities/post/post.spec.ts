import { Post } from './post';

describe('Post class', () => {
  it('should create a post with default values for optional properties', () => {
    const post = new Post({
      title: 'My Post Title',
      content: 'My post content',
      isDraft: false,
      isRestrict: false,
      userId: 1,
    });

    expect(post.externalId).toBeTruthy();
    expect(post.createdAt instanceof Date).toBeTruthy();
    expect(post.updatedAt instanceof Date).toBeTruthy();
  });

  it('should allow setting optional properties', () => {
    const post = new Post({
      externalId: '12345678-90ab-cdef-1234-567890abcdef',
      title: 'My Post Title',
      content: 'My post content',
      isDraft: true,
      isRestrict: true,
      userId: 2,
      createdAt: new Date(2023, 10, 14),
      updatedAt: new Date(2023, 10, 14),
    });

    expect(post.externalId).toBe('12345678-90ab-cdef-1234-567890abcdef');
    expect(post.createdAt).toEqual(new Date(2023, 10, 14));
    expect(post.updatedAt).toEqual(new Date(2023, 10, 14));
  });

  it('should provide getter and setter methods for all properties', () => {
    const post = new Post({
      title: 'My Post Title',
      content: 'My post content',
      isDraft: false,
      isRestrict: false,
      userId: 1,
    });

    expect(post.id).toBeUndefined();
    expect(post.externalId).toBeTruthy();
    expect(post.title).toBe('My Post Title');
    expect(post.content).toBe('My post content');
    expect(post.isDraft).toBeFalsy();
    expect(post.isRestrict).toBeFalsy();
    expect(post.userId).toBe(1);
    expect(post.createdAt instanceof Date).toBeTruthy();
    expect(post.updatedAt instanceof Date).toBeTruthy();

    post.title = 'Updated Post Title';
    post.content = 'Updated post content';
    post.isDraft = true;
    post.isRestrict = true;
    post.userId = 2;
    post.update();

    expect(post.title).toBe('Updated Post Title');
    expect(post.content).toBe('Updated post content');
    expect(post.isDraft).toBeTruthy();
    expect(post.isRestrict).toBeTruthy();
    expect(post.userId).toBe(2);
    expect(post.createdAt instanceof Date).toBeTruthy();
    expect(post.updatedAt instanceof Date).toBeTruthy();
  });
});
