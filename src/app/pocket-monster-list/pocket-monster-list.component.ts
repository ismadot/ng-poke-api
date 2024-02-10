import { Component, OnInit } from '@angular/core';
import { PocketMonsterService } from '../pocket-monster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pocket-monster-list',
  standalone: true,
  imports: [CommonModule], // Añade CommonModule aquí
  templateUrl: './pocket-monster-list.component.html',
  styleUrl: './pocket-monster-list.component.scss',
})
export class PocketMonsterListComponent implements OnInit {
  pocketMonsterList: any = [];

  constructor(private pocketMonsterService: PocketMonsterService) {}

  ngOnInit(): void {
    this.pocketMonsterService.getPokemonList().subscribe((data) => {
      this.pocketMonsterList = data.results;
    });
  }
}
