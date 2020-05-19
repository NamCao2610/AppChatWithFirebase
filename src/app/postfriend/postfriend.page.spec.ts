import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostfriendPage } from './postfriend.page';

describe('PostfriendPage', () => {
  let component: PostfriendPage;
  let fixture: ComponentFixture<PostfriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostfriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostfriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
