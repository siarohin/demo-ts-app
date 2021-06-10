export abstract class GarageView {
  /**
   * Returns a garage template
   */
  public static getGarageImage(): string {
    return `
      <div class="app-garage">
        <button class="app-car-item__create-button">New car</button>
      </div>`;
  }
}
