export class JobRole {
  constructor(
    private _title: string = "",
    private _summary: string = "Sample Job Role Summary",
    private _appearanceCount: number = 0,
    private _personalityTraits: string[] = ["[Insert popular personality traits"],
    private _responsibilities: string[] = ["[Insert common responsibilities]"],
    private _techRequirements: string[] = ["[Insert technical requirements]"],
    private _nonTechRequirements: string[] = ["[Insert non-technical requirements]"],
    private _preferredQualifications: string[] = ["[Insert preferred qualifications]"]
  ) { }

  get title() { return this._title; }
  get summary() { return this._summary; }
  get appearanceCount() { return this._appearanceCount; }
  get personalityTraits() { return this._personalityTraits; }
  get responsibilities() { return this._responsibilities; }
  get techRequirements() { return this._techRequirements; }
  get nonTechRequirements() { return this._nonTechRequirements; }
  get preferredQualifications() { return this._preferredQualifications; }

  set title(x) { this._title = x; }
  set summary(x) { this._summary = x; }
  set appearanceCount(x) { this._appearanceCount = x; }
  set personalityTraits(x) { this._personalityTraits = x; }
  set responsibilities(x) { this._responsibilities = x; }
  set techRequirements(x) { this._techRequirements = x; }
  set nonTechRequirements(x) { this._nonTechRequirements = x; }
  set preferredQualifications(x) { this._preferredQualifications = x; }
}