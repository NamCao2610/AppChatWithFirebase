import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagechatPage } from './pagechat.page';

describe('PagechatPage', () => {
  let component: PagechatPage;
  let fixture: ComponentFixture<PagechatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagechatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagechatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
