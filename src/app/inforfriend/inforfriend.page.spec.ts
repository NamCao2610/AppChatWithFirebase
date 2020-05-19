import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InforfriendPage } from './inforfriend.page';

describe('InforfriendPage', () => {
  let component: InforfriendPage;
  let fixture: ComponentFixture<InforfriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforfriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InforfriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
