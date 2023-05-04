export class Album {
    albumId: string;
  
    name: string;
  
    location: string;
  
    createdAt: Date;
  
    userId: string;
  
    constructor(
      albumId: string,
      name: string,
      location: string,
      createdAt: Date,
      userId: string,
    ) {
      this.albumId = albumId;
      this.name = name;
      this.location = location;
      this.createdAt = createdAt;
      this.userId = userId;
    }
  }