import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { CategoryHttp } from 'src/app/core/http/category.http';
import { Category } from 'src/app/shared/models/category';
import { TreeNode } from 'src/app/shared/models/treeNode';
import { JwtService } from 'src/app/core/services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true;

  private _transformer = (node: Category, level: number) => {
    return {
      expandable: true,
      name: node.title,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<TreeNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.subCategories);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private categoryHttp: CategoryHttp,
    private toastr: ToastrService,
    private auth: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryHttp.getCateogries().subscribe((res: Category[]) => {
      this.dataSource.data = res;
      this.isLoading = false;
    }, err => {
      this.toastr.error(err.errorMessage);
      this.isLoading = false
    })
  }

  hasChild = (_: number, node: TreeNode) => node.expandable;

  logoutHandler(): void {
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
