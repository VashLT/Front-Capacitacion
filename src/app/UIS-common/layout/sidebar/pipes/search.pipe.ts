import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(array, text) {
    if (text === "") {
      return array;
    }
    const getNodes = (result, object) => {
      if (object.name === text) {
        result.push(object);
        return result;
      }
      if (Array.isArray(object.children)) {
        const nodes = object.children.reduce(getNodes, []);
        if (nodes.length) result.push({ ...object, nodes });
      }
      return result;
    };
    return array.reduce(getNodes, []);

    // return array.reduce(getNodes, []);
    // if (value && args && args != "") {
    //   if (!args[0]) {
    //     return value;
    //   } else if (value) {
    //     return value.filter((item) => {
    //       for (let key in item) {
    //         if (
    //           (typeof item[key] === "string" || item[key] instanceof String) &&
    //           item[key].toUpperCase().indexOf(args.toUpperCase()) !== -1
    //         ) {
    //           return true;
    //         } else if (
    //           (typeof item[key] === "number" || item[key] instanceof Number) &&
    //           item[key].toString().indexOf(args) !== -1
    //         ) {
    //           return true;
    //         }
    //       }
    //     });
    //   }
    // }
    // return value;
    // }
  }
}
