import { Pipe, PipeTransform } from '@angular/core';
export type HeigthType = "M" | "Dm" | "Cm" | "Mm"

@Pipe({
  name: 'heigthPipe'
})

export class HeigthPipePipe implements PipeTransform {

  transform(value: number, inputFormat:HeigthType, outputFormat:HeigthType): unknown {
    return (value / this.calculateTransform(inputFormat, outputFormat)).toFixed(2) + " " +outputFormat;
  }
  private calculateTransform(inputFormat:HeigthType, outputFormat:HeigthType): number{
    let heigthConversion = [
      {
        type:"M",
        associatedValue:1
      },
      {
        type:"Dm",
        associatedValue:0.1
      },
      {
        type:"Cm",
        associatedValue:0.01
      },
      {
        type:"Dm",
        associatedValue:0.001
      }
    ]
    let inputAssociatedValue = 0
    let outputAssociatedValue = 0

    heigthConversion.forEach(h=>{
      if(h.type == inputFormat) inputAssociatedValue = h.associatedValue
      if(h.type == outputFormat) outputAssociatedValue = h.associatedValue
    })
    
    return outputAssociatedValue/inputAssociatedValue
  }

}
