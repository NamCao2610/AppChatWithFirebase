import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabfriendPage } from './tabfriend.page';

describe('TabfriendPage', () => {
  let component: TabfriendPage;
  let fixture: ComponentFixture<TabfriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabfriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabfriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
