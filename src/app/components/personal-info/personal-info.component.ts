import { Component, OnInit } from '@angular/core';
import { HttpserviceService} from '../../services/httpservice.service';
import { UserInfoService } from '../../services/user-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  private name: string = "Niubi";
  private isLoadingOne: boolean;
  private friendName: string;
  private friends: Array<string>;
  private paths = "assets/imgs/p_big3.jpg";
  private dateTime = new Date();
  private r : boolean;
  private gender: string;
  private http: HttpserviceService;
  private userService: UserInfoService;
  private currentUser: any;
  private repos = [];
  private isVisible: boolean;
  private isOkLoading: boolean;
  private validateForm: any;

  constructor(http: HttpserviceService, userService: UserInfoService, private fb: FormBuilder) { 
    this.friends = [];
    this.friends.push("Bill1");
    this.friends.push("Bill2");
    this.friends.push("Bill3");
    this.friends.push("Bill4");
    this.friends.push("Bill5");
    this.http = http;
    this.userService = userService;
    
    this.currentUser = this.userService.getUserInfo();
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    });
  }
    
    
  
  public changeName(): void {

    this.name = "Zhenniubi";
    console.log("111");
    // 成员变量加this,不加this就是方法里面的变量或形参

  }

  public changeHtml(): void {
    document.getElementById("name").innerHTML = "HTML";
    console.log(this.name)
  }
  deleteItem(key){
    this.friends.splice(key,1);
  }

  public addFriend(){
    this.friends.push(this.friendName);
    this.friendName = "";
  }

  public loadOne() {
    this.isLoadingOne = true;
    const token = this.userService.getUserInfo().token;
    const uuid = this.userService.getUserInfo().uuid;
    this.http.getUserInfo(uuid, token).subscribe((data: any) =>{
      console.log(data);
    });
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 2000);
  }

  public edit(){
    this.isVisible = true;
  }

  handleOk(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isOkLoading = true;

      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
      }, 3000);
    }
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  
}
